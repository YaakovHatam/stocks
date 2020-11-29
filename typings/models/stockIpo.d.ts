declare namespace StocksIpoEstimator {
    export interface stockIpo {
        lastYearRptDt: string;
        lastYearEPS: string;
        time: string;
        symbol: string;
        name: string;
        marketCap: string;
        fiscalQuarterEnding: string;
        epsForecast: string;
        noOfEsts: number;
    }
}