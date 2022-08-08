import React from 'react'

const Reposts = () => {
    return (
        <>
            <div className="main-panel">
                <div className="content-wrapper">
                    <div className="row">
                        <div className="col-lg-6 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body"><div className="chartjs-size-monitor"><div className="chartjs-size-monitor-expand"><div className=""></div></div><div className="chartjs-size-monitor-shrink"><div className=""></div></div></div>
                                    <h4 className="card-title">Line chart</h4>
                                    <canvas id="lineChart" width="464" height="232"  className="chartjs-render-monitor report_chart"></canvas>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body"><div className="chartjs-size-monitor"><div className="chartjs-size-monitor-expand"><div className=""></div></div><div className="chartjs-size-monitor-shrink"><div className=""></div></div></div>
                                    <h4 className="card-title">Bar chart</h4>
                                    <canvas id="barChart"  width="464" height="232" className="chartjs-render-monitor report_chart"></canvas>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body"><div className="chartjs-size-monitor"><div className="chartjs-size-monitor-expand"><div className=""></div></div><div className="chartjs-size-monitor-shrink"><div className=""></div></div></div>
                                    <h4 className="card-title">Area chart</h4>
                                    <canvas id="areaChart" width="464" height="232"  className="chartjs-render-monitor report_chart"></canvas>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body"><div className="chartjs-size-monitor"><div className="chartjs-size-monitor-expand"><div className=""></div></div><div className="chartjs-size-monitor-shrink"><div className=""></div></div></div>
                                    <h4 className="card-title">Doughnut chart</h4>
                                    <canvas id="doughnutChart" width="464" height="232"  className="chartjs-render-monitor report_chart"></canvas>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6 grid-margin grid-margin-lg-0 stretch-card">
                            <div className="card">
                                <div className="card-body"><div className="chartjs-size-monitor"><div className="chartjs-size-monitor-expand"><div className=""></div></div><div className="chartjs-size-monitor-shrink"><div className=""></div></div></div>
                                    <h4 className="card-title">Pie chart</h4>
                                    <canvas id="pieChart" width="464" height="232"  className="chartjs-render-monitor report_chart"></canvas>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 grid-margin grid-margin-lg-0 stretch-card">
                            <div className="card">
                                <div className="card-body"><div className="chartjs-size-monitor"><div className="chartjs-size-monitor-expand"><div className=""></div></div><div className="chartjs-size-monitor-shrink"><div className=""></div></div></div>
                                    <h4 className="card-title">Scatter chart</h4>
                                    <canvas id="scatterChart" width="464" height="232"  className="chartjs-render-monitor report_chart"></canvas>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Reposts