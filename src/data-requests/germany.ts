import axios from "axios";
import { ResponseData } from "./response-data";
import { getDateBefore, RKIError } from '../utils';

export async function getCases(): Promise<ResponseData<number>> {
    const response = await axios.get(`https://services7.arcgis.com/mOBPykOjAyBO2ZKk/arcgis/rest/services/RKI_COVID19/FeatureServer/0/query?where=NeuerFall IN(1,0)&objectIds=&time=&resultType=standard&outFields=AnzahlFall,MeldeDatum&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnDistinctValues=false&cacheHint=false&outStatistics=[{"statisticType":"sum","onStatisticField":"AnzahlFall","outStatisticFieldName":"cases"},{"statisticType":"max","onStatisticField":"MeldeDatum","outStatisticFieldName":"date"}]&having=&resultOffset=&resultRecordCount=&sqlFormat=none&f=json&token=`);
    const data = response.data;
    if (data.error) {
        throw new RKIError(data.error, response.config.url);
    }
    return {
        data: data.features[0].attributes.cases,
        lastUpdate: new Date(data.features[0].attributes.date)
    }
}

export async function getNewCases(): Promise<ResponseData<number>> {
    const response = await axios.get(`https://services7.arcgis.com/mOBPykOjAyBO2ZKk/arcgis/rest/services/RKI_COVID19/FeatureServer/0/query?where=NeuerFall IN(1,-1)&objectIds=&time=&resultType=standard&outFields=AnzahlFall,MeldeDatum&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnDistinctValues=false&cacheHint=false&outStatistics=[{"statisticType":"sum","onStatisticField":"AnzahlFall","outStatisticFieldName":"cases"},{"statisticType":"max","onStatisticField":"MeldeDatum","outStatisticFieldName":"date"}]&having=&resultOffset=&resultRecordCount=&sqlFormat=none&f=json&token=`);
    const data = response.data;
    if (data.error) {
        throw new RKIError(data.error, response.config.url);
    }
    return {
        data: data.features[0].attributes.cases,
        lastUpdate: new Date(data.features[0].attributes.date)
    }
}

export async function getLastCasesHistory(days?: number): Promise<{ cases: number, date: Date }[]> {

    const whereParams = ["NeuerFall IN(1,0)"];
    if (days != null) {
        const dateString = getDateBefore(days);
        whereParams.push(`MeldeDatum >= TIMESTAMP '${dateString}'`);
    }
    const url = `https://services7.arcgis.com/mOBPykOjAyBO2ZKk/arcgis/rest/services/RKI_COVID19/FeatureServer/0/query?where=${whereParams.join(" AND ")}&objectIds=&time=&resultType=standard&outFields=AnzahlFall,MeldeDatum&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnDistinctValues=false&cacheHint=false&orderByFields=MeldeDatum&groupByFieldsForStatistics=MeldeDatum&outStatistics=[{"statisticType":"sum","onStatisticField":"AnzahlFall","outStatisticFieldName":"cases"},{"statisticType":"max","onStatisticField":"MeldeDatum","outStatisticFieldName":"date"}]&having=&resultOffset=&resultRecordCount=&sqlFormat=none&f=json&token=`

    const response = await axios.get(url);
    const data = response.data;
    if (data.error) {
        throw new RKIError(data.error, response.config.url);
    }
    return data.features.map((feature) => {
        return {
            cases: feature.attributes.cases,
            date: new Date(feature.attributes.date)
        }
    });
}

export async function getLastDeathsHistory(days?: number): Promise<{ deaths: number, date: Date }[]> {

    const whereParams = ["NeuerTodesfall IN(1,0,-9)"];
    if (days != null) {
        const dateString = getDateBefore(days);
        whereParams.push(`MeldeDatum >= TIMESTAMP '${dateString}'`);
    }
    const url = `https://services7.arcgis.com/mOBPykOjAyBO2ZKk/arcgis/rest/services/RKI_COVID19/FeatureServer/0/query?where=${whereParams.join(" AND ")}&objectIds=&time=&resultType=standard&outFields=AnzahlTodesfall,MeldeDatum&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnDistinctValues=false&cacheHint=false&orderByFields=MeldeDatum&groupByFieldsForStatistics=MeldeDatum&outStatistics=[{"statisticType":"sum","onStatisticField":"AnzahlTodesfall","outStatisticFieldName":"deaths"},{"statisticType":"max","onStatisticField":"MeldeDatum","outStatisticFieldName":"date"}]&having=&resultOffset=&resultRecordCount=&sqlFormat=none&f=json&token=`

    const response = await axios.get(url);
    const data = response.data;
    if (data.error) {
        throw new RKIError(data.error, response.config.url);
    }
    return data.features.map((feature) => {
        return {
            deaths: feature.attributes.deaths,
            date: new Date(feature.attributes.date)
        }
    });
}

export async function getLastRecoveredHistory(days?: number): Promise<{ recovered: number, date: Date }[]> {

    const whereParams = ["NeuGenesen IN(1,0,-9)"];
    if (days != null) {
        const dateString = getDateBefore(days);
        whereParams.push(`MeldeDatum >= TIMESTAMP '${dateString}'`);
    }
    const url = `https://services7.arcgis.com/mOBPykOjAyBO2ZKk/arcgis/rest/services/RKI_COVID19/FeatureServer/0/query?where=${whereParams.join(" AND ")}&objectIds=&time=&resultType=standard&outFields=AnzahlGenesen,MeldeDatum&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnDistinctValues=false&cacheHint=false&orderByFields=MeldeDatum&groupByFieldsForStatistics=MeldeDatum&outStatistics=[{"statisticType":"sum","onStatisticField":"AnzahlGenesen","outStatisticFieldName":"recovered"},{"statisticType":"max","onStatisticField":"MeldeDatum","outStatisticFieldName":"date"}]&having=&resultOffset=&resultRecordCount=&sqlFormat=none&f=json&token=`

    const response = await axios.get(url);
    const data = response.data;
    if (data.error) {
        throw new RKIError(data.error, response.config.url);
    }
    return data.features.map((feature) => {
        return {
            recovered: feature.attributes.recovered,
            date: new Date(feature.attributes.date)
        }
    });
}

export async function getDeaths(): Promise<ResponseData<number>> {
    const response = await axios.get(`https://services7.arcgis.com/mOBPykOjAyBO2ZKk/arcgis/rest/services/RKI_COVID19/FeatureServer/0/query?where=NeuerTodesfall IN(1,0)&objectIds=&time=&resultType=standard&outFields=AnzahlTodesfall,MeldeDatum&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnDistinctValues=false&cacheHint=false&outStatistics=[{"statisticType":"sum","onStatisticField":"AnzahlTodesfall","outStatisticFieldName":"deaths"},{"statisticType":"max","onStatisticField":"MeldeDatum","outStatisticFieldName":"date"}]&having=&resultOffset=&resultRecordCount=&sqlFormat=none&f=json&token=`);
    const data = response.data;
    if (data.error) {
        throw new RKIError(data.error, response.config.url);
    }
    return {
        data: data.features[0].attributes.deaths,
        lastUpdate: new Date(data.features[0].attributes.date)
    }
}

export async function getNewDeaths(): Promise<ResponseData<number>> {
    const response = await axios.get(`https://services7.arcgis.com/mOBPykOjAyBO2ZKk/arcgis/rest/services/RKI_COVID19/FeatureServer/0/query?where=NeuerTodesfall IN(1,-1)&objectIds=&time=&resultType=standard&outFields=AnzahlTodesfall,MeldeDatum&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnDistinctValues=false&cacheHint=false&outStatistics=[{"statisticType":"sum","onStatisticField":"AnzahlTodesfall","outStatisticFieldName":"deaths"},{"statisticType":"max","onStatisticField":"MeldeDatum","outStatisticFieldName":"date"}]&having=&resultOffset=&resultRecordCount=&sqlFormat=none&f=json&token=`);
    const data = response.data;
    if (data.error) {
        throw new RKIError(data.error, response.config.url);
    }
    return {
        data: data.features[0].attributes.deaths,
        lastUpdate: new Date(data.features[0].attributes.date)
    }
}

export async function getRecovered(): Promise<ResponseData<number>> {
    const response = await axios.get(`https://services7.arcgis.com/mOBPykOjAyBO2ZKk/arcgis/rest/services/RKI_COVID19/FeatureServer/0/query?where=NeuGenesen IN(1,0)&objectIds=&time=&resultType=standard&outFields=AnzahlGenesen,MeldeDatum&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnDistinctValues=false&cacheHint=false&outStatistics=[{"statisticType":"sum","onStatisticField":"AnzahlGenesen","outStatisticFieldName":"recovered"},{"statisticType":"max","onStatisticField":"MeldeDatum","outStatisticFieldName":"date"}]&having=&resultOffset=&resultRecordCount=&sqlFormat=none&f=json&token=`);
    const data = response.data;
    if (data.error) {
        throw new RKIError(data.error, response.config.url);
    }
    return {
        data: data.features[0].attributes.recovered,
        lastUpdate: new Date(data.features[0].attributes.date)
    }
}

export async function getNewRecovered(): Promise<ResponseData<number>> {
    const response = await axios.get(`https://services7.arcgis.com/mOBPykOjAyBO2ZKk/arcgis/rest/services/RKI_COVID19/FeatureServer/0/query?where=NeuGenesen IN(1,-1)&objectIds=&time=&resultType=standard&outFields=AnzahlGenesen,MeldeDatum&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnDistinctValues=false&cacheHint=false&outStatistics=[{"statisticType":"sum","onStatisticField":"AnzahlGenesen","outStatisticFieldName":"recovered"},{"statisticType":"max","onStatisticField":"MeldeDatum","outStatisticFieldName":"date"}]&having=&resultOffset=&resultRecordCount=&sqlFormat=none&f=json&token=`);
    const data = response.data;
    if (data.error) {
        throw new RKIError(data.error, response.config.url);
    }
    return {
        data: data.features[0].attributes.recovered,
        lastUpdate: new Date(data.features[0].attributes.date)
    }
}