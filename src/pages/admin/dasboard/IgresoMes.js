import React, { useRef, useEffect } from 'react';
import ChartJs from 'chart.js';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent } from '@material-ui/core';

import { get } from '../../../helpers/fetch';

ChartJs.defaults.global.maintainAspectRatio = false; // fits chart in it's parent container

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
  },
  chartContainer: {
    height: '300px',
    paddingBottom: '5em',
    position: 'relative',
  },
  stats: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(2),
  },
  device: {
    padding: theme.spacing(1),
    textAlign: 'center',
  },
  deviceIcon: {
    color: theme.palette.icon,
  },
}));

const IngresoMes = () => {
  const classes = useStyles();
  const chartContainer = useRef(null);

  useEffect(() => {
    get('dasboard/mesSuscripcion')
      .then((res) => res.json())
      .then(({ data }) => {
        const chartConfig = {
          type: 'doughnut',
          data: {
            labels: [
              'ENERO',
              'FEBRERO',
              'MARZO',
              'ABRIL',
              'MAYO',
              'JUNIO',
              'JULIO',
              'AGOSTO',
              'SEPTIEMBRE',
              'OCTUBRE',
              'NOVIEMBRE',
              'DICIEMBRE',
            ],
            datasets: [
              {
                data,
                backgroundColor: [
                  '#4DC3D7',
                  '#FA9C55',
                  '#CB4141',
                  '#3e95cd',
                  '#8e5ea2',
                  '#3cba9f',
                  '#e8c3b9',
                  '#c45850',
                  '#3e95cd',
                  '#8e5ea2',
                  '#3cba9f',
                  '#e8c3b9',
                ],
              },
            ],
          },
        };

        if (window.chartInstance) window.chartInstance.destroy();
        window.chartInstance = new ChartJs(chartContainer.current, chartConfig);
      });
  }, [chartContainer]);

  return (
    <Card className={classes.root}>
      <CardContent className={classes.chartContainer}>
        <canvas ref={chartContainer} />
      </CardContent>
    </Card>
  );
};

export default IngresoMes;
