import type { FC } from 'react';
import { Heatmap, G2 } from '@ant-design/charts';
import type { HeatmapConfig } from '@ant-design/charts/es/heatmap/index';
import type { G2HeatmapData } from '@/utils';
import { useDarkTheme } from '@/hooks';

const colorMap = ['#eaecef', '#9be9a8', '#40c463', '#30a14e', '#216e39'];
const colorMapDark = ['#161b22', '#003820', '#00602d', '#1d9d47', '#26d545'];

interface HeatMapProps {
  data: G2HeatmapData[];
}
const DemoHeatmap: FC<HeatMapProps> = ({ data }) => {
  const { theme } = useDarkTheme();

  G2.registerShape('polygon', 'boundary-polygon', {
    draw: function draw(cfg, container) {
      const group = container.addGroup();
      const attrs = {
        stroke: theme === 'light' ? '#fff' : '#000',
        lineWidth: 1,
        fill: cfg.color,
        path: [],
      };
      const { points } = cfg;

      const path = [
        // @ts-ignore
        ['M', points?.[0].x, points?.[0].y],
        // @ts-ignore
        ['L', points?.[1].x, points?.[1].y],
        // @ts-ignore
        ['L', points?.[2].x, points?.[2].y],
        // @ts-ignore
        ['L', points?.[3].x, points?.[3].y],
        ['Z'],
      ];
      // @ts-ignore
      attrs.path = this.parsePath(path);

      group.addShape('path', { attrs });

      return group;
    },
  });

  const config: HeatmapConfig = {
    data,
    height: 112,
    padding: [0, 0, 0, 20],
    xField: 'week',
    yField: 'day',
    colorField: 'level',
    color: theme === 'light' ? colorMap : colorMapDark,
    reflect: 'y',
    shape: 'boundary-polygon',
    meta: {
      day: {
        type: 'cat',
        values: ['日', '一', '二', '三', '四', '五', '六'],
      },
      week: { type: 'cat' },
      commits: { sync: true, alias: '修改次数' },
      date: { type: 'cat' },
      level: { alias: '活跃等级' },
    },
    limitInPlot: true,
    yAxis: { grid: null },
    tooltip: {
      title: 'date',
      fields: ['commits'],
      showMarkers: false,
    },
    interactions: [{ type: 'element-active' }],
    xAxis: {
      position: 'top',
      tickLine: null,
      line: null,
      label: {
        offset: 12,
        style: {
          fontSize: 12,
          fill: '#666',
          textBaseline: 'top',
        },
        formatter: function formatter(val) {
          if (val === '2') {
            return 'MAY';
          }
          if (val === '6') {
            return 'JUN';
          }
          if (val === '10') {
            return 'JUL';
          }
          if (val === '15') {
            return 'AUG';
          }
          if (val === '19') {
            return 'SEP';
          }
          if (val === '24') {
            return 'OCT';
          }
          return '';
        },
      },
    },
  };

  return <Heatmap {...config} />;
};

export default DemoHeatmap;
