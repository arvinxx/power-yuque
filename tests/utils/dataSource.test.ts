/**
 * @jest-environment node
 */

import type { ActivityDoc } from '@/utils';
import {
  // fetchRepo,
  fetchDocs,
  // fetchGroup,
  fetchUser,
  getActivityData,
  mapToHeatData,
  lastYearData,
} from '@/utils';
import { readJSONSync } from 'fs-extra';
import { join } from 'path';

describe('数据请求', () => {
  it('成功获取 用户信息 ', async () => {
    const data = await fetchUser();

    expect(data.login).toEqual('ceshizhanghao-oxvzu');
  });
  // it('成功获取 Group ', async () => {
  //   const data = await fetchGroup('ceshizhanghao-oxvzu');
  //   console.log(data);
  //   if (data) {
  //     expect(data[0]).toEqual('lruur3');
  //   }
  // });

  // it('成功获取 Repo ', async () => {
  //   const data = await fetchRepo('lruur3');
  //   expect(data).toEqual(['lruur3/cv407h', 'lruur3/wo986l']);
  // });

  it('成功获取仓库文档列表', async () => {
    const data = await fetchDocs('lruur3/cv407h');
    expect(data).toEqual([
      {
        time: '2021-02-09T14:41:57.000Z',
        title: '测试 3',
        url: '/lruur3/cv407h/yyuitu',
        user_id: 85716,
      },
      {
        time: '2021-02-09T14:41:47.000Z',
        title: '测试 2',
        url: '/lruur3/cv407h/ggfzen',
        user_id: 85716,
      },
      {
        time: '2021-02-09T14:41:35.000Z',
        title: '测试 1',
        url: '/lruur3/cv407h/zq1q06',
        user_id: 85716,
      },
    ]);
  });
});

describe('数据转换', () => {
  it('获取所有自己创建的文档', async () => {
    const data = await getActivityData();

    expect(data).toEqual({
      data: [],
      username: 'ceshizhanghao-oxvzu',
    });
  }, 20000);

  it('转换文档', () => {
    const testData: ActivityDoc[] = readJSONSync(
      join(__dirname, './testData.json'),
    );

    expect(mapToHeatData(testData).length).toBeGreaterThanOrEqual(366);
  });

  it('lastYearData', () => {
    const data = lastYearData();
    expect(data.length).toBeGreaterThanOrEqual(366);
  });
});
