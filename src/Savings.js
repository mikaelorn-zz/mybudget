import React, { Component } from 'react';
import './App.css';
// import NumberFormat from 'react-number-format';
// import { Container, Row, Col } from 'react-grid-system';
// import { setConfiguration } from 'react-grid-system';
import * as Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';

const options = {
    rangeSelector: {
        selected: 1
    },
    title: {
        text: "Totalen"
    },
    series: [
        {
            name: "Sum",
            tooltip: {
                valueDecimals: 2
            },
            data: [
                [
                    1555430498000,
                    63299
                ]
            ]
        }
    ]
}

class Savings extends Component {

render() {
    return(
        <div>
            <p1>Spara</p1>
            <HighchartsReact
                highcharts={Highcharts}
                constructorType={'stockChart'}
                options={options}
            />
        </div>
    );
    }
}


export default Savings;
