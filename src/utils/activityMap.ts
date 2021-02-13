import { request } from './request';
import { flattenDeep } from 'lodash';
import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import relativeTime from 'dayjs/plugin/relativeTime';
import { groupBy, orderBy, unionBy } from 'lodash';

dayjs.extend(weekOfYear);
dayjs.extend(isSameOrAfter);
dayjs.extend(relativeTime);

export interface ActivityDoc {
  user_id: number;
  time: Date;
  title: string;
  url: string;
}

export interface G2HeatmapData {
  date: string;
  commits: number;
  month: number;
  day: number;
  week: number;
}

/**
 * 获取用户信息
 */
export const fetchUser = async () => {
  const { data } = await request.get<YuqueApi.UserResponse>(`/user`);

  return data;
};

/**
 * 获取用户所有的 group
 * @param username
 */
export const fetchGroup = async (username: string) => {
  const { data } = await request.get<YuqueApi.GroupResponse>(
    `/users/${username}/groups`,
  );
  if (data) {
    return data.map((item) => {
      const { login } = item;

      return login;
    });
  }
  return undefined;
};

/**
 * 获取用户所有 repo 地址
 * @param username
 */
export const fetchRepo = async (username: string) => {
  const { data } = await request.get<YuqueApi.RepoResponse>(
    `/users/${username}/repos`,
  );
  if (data) {
    return data.map((item) => {
      const { namespace } = item;

      return namespace;
    });
  }
  return undefined;
};

/**
 * 获取单个仓库的文档
 * @param namespace
 */
export const fetchDocs = async (namespace: string) => {
  const { data } = await request.get<YuqueApi.DocResponse>(
    `/repos/${namespace}/docs`,
  );

  if (data) {
    return data.map((item) => {
      const { user_id, updated_at, title, slug } = item;

      return { user_id, time: updated_at, title, url: `/${namespace}/${slug}` };
    });
  }

  return undefined;
};

/**
 * 从语雀仓库获取活跃数据
 */
export const getActivityData = async () => {
  const { login, id } = await fetchUser();

  const groupList = await fetchGroup(login);

  if (!groupList) throw Error('获取登录信息错误!');

  groupList.push(login);

  const repoPoolPromise = groupList.map(fetchRepo);
  const repoPool = await Promise.all(repoPoolPromise);

  const tempDocList: any[] = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const repoList of repoPool) {
    if (repoList) {
      const docsPoolPromise = repoList.map(fetchDocs);
      // eslint-disable-next-line no-await-in-loop
      const docsResult = await Promise.all(docsPoolPromise);
      tempDocList.push(docsResult);
    }
  }

  const docs: ActivityDoc[] = flattenDeep(tempDocList);

  return {
    username: login,
    data: docs.filter(({ user_id }) => {
      return user_id === id;
    }),
  };
};

/**
 * 活跃等级映射
 * @param count
 */
export const mapDataCountToLevel = (count: number) => {
  if (count === 0) return 0;
  if (count < 2) return 1;
  if (count < 5) return 2;
  if (count < 15) return 3;
  return 4;
};
/**
 * 计算距今天开始是第几天
 * @param date
 * @param type
 */
const calcDateDiff = (date: string, type: 'week' | 'month') => {
  const base = dayjs()[type]();
  const diff = base - dayjs(date)[type]();
  const baseNumber = type === 'week' ? 52 : 12;
  // 需要处理下同一周但是不同年的情况
  if (diff === 0) {
    if (dayjs(date).year() !== dayjs().year()) return 0;
  }
  return diff < 0 ? -diff : baseNumber - diff;
};

/**
 * 获取一年的数据
 */
export const lastYearData = () => {
  const startTime = dayjs();
  const lastYear = startTime.subtract(1, 'year');
  const data: G2HeatmapData[] = [];
  const days = startTime.diff(lastYear, 'd');

  for (let i = 0; i <= days; i += 1) {
    const date = lastYear.add(i, 'd').format('YYYY-MM-DD');

    data.push({
      date,
      commits: 0,
      month: calcDateDiff(date, 'month'),
      day: dayjs(date).day(),
      week: calcDateDiff(date, 'week'),
    });
  }
  return data;
};

/**
 * 将活跃数据转换为热力图数据
 * @param docs
 */
export const mapToHeatData = (docs: ActivityDoc[]): G2HeatmapData[] => {
  // // 先从数据中取出去年的数据
  const startTime = dayjs();
  const lastYear = startTime.subtract(1, 'year');
  const lastYearDocs = docs.filter((doc) =>
    dayjs(doc.time).isSameOrAfter(lastYear),
  );
  const docsInDay = groupBy(
    lastYearDocs.map((item) => ({
      ...item,
      time: dayjs(item.time).format('YYYY-MM-DD'),
    })),
    'time',
  );
  let data = Object.entries(docsInDay).map(([date, item]) => {
    return {
      date,
      commits: item.length,
      month: calcDateDiff(date, 'month'),
      day: dayjs(date).day(),
      week: calcDateDiff(date, 'week'),
    };
  });

  const base = lastYearData();

  // 将数据合并
  data = unionBy([...data, ...base], 'date');

  return orderBy(data, 'week').map((item, index) => ({
    ...item,
    lastDay: index + 1 === data.length,
  }));
};
