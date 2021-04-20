import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import ChartJs from 'chart.js';
import { Card, CardContent } from '@material-ui/core';

import { get } from '../../../helpers/fetch';

ChartJs.defaults.global.maintainAspectRatio = false; // fits chart in it's parent container

const useStyles = makeStyles(() => ({
  root: {
    height: '100%',
  },
  chartContainer: {
    height: 400,
    position: 'relative',
  },
  actions: {
    justifyContent: 'flex-end',
  },
}));

const SymptomsChart = () => {
  const classes = useStyles();

  useEffect(() => {
    const fetchTotalIngresos = async () => {
      const { data } = await get('dasboard/mesTotal').then((res) => res.json());
      new ChartJs(document.getElementById('bar-chart'), {
        type: 'bar',
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
              label: 'Pesos $RD',
              backgroundColor: [
                '#3e95cd',
                '#8e5ea2',
                '#3cba9f',
                '#e8c3b9',
                '#c45850',
                '#3e95cd',
                '#8e5ea2',
                '#3cba9f',
                '#e8c3b9',
                '#c45850',
                '#3e95cd',
                '#8e5ea2',
              ],
              data,
            },
          ],
        },
        options: {
          legend: { display: false },
          title: {
            display: true,
            text: 'Ventas por meses del Ano',
          },
        },
      });
    };
    fetchTotalIngresos();
  }, []);

  return (
    <Card className={classes.root}>
      <CardContent className={classes.chartContainer}>
        <canvas id="bar-chart" width="800" height="450"></canvas>
      </CardContent>
    </Card>
  );
};

export default SymptomsChart;
