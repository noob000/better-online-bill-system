import { useState, useEffect } from "react";
import { Select, Collapse } from "antd";
import PieChart from "../components/Piechart";
import MonthlyChart from "../components/monthlychart";
import YearlyChart from "../components/yearlychart";
import { MainData, YearSortedData } from "../index.d";
import '../style/css/analysis.css';
import { myPost } from "../components/request";
import React from "react";
export default function Analysis(props: any) {
    const [data, setData] = useState<MainData[]>([]);
    const [yearList, setYearList] = useState<number[]>([]);
    const [data_year, setdata_year] = useState<YearSortedData[]>([]);
    const [year, setYear] = useState<number>(2021);
    useEffect(() => {
        if (props.email) {
            myPost("getUserData", {
                email: props.email
            })
           .then((res:any) => {
                let billData = res.data.data;
                setData(billData);

            })
        }

    }, [props])
    useEffect(() => {
        let data_year = [], yearlist = [];
        for (let element of data) {
            let year = new Date(element.dateObject).getFullYear();
            if (data_year.length === 0) {
                let item = {
                    year: year,
                    data: [element]
                }
                data_year.push(item);
                yearlist.push(year);
            }
            else {
                let i = 0, l = yearlist.length, state = true;
                while (i < l && state) {
                    if (data_year[i].year === year) {
                        let newItem: any = {
                            year: year,
                            data: [...data_year[i].data, ...[element]]
                        }
                        data_year[i] = newItem;
                        state = false
                    }
                    else i++;
                }
                if (state) {
                    yearlist.push(year);
                    data_year.push({
                        year: year,
                        data: [element]
                    })
                }
            }
        }//?????????????????????????????????????????????????????????????????????????????????????????????????????????
        setdata_year(data_year);
        setYearList(yearlist);
    }, [data]);
    return (
        <div>
            <div>
                <Collapse style={{ width: '100%' }}>
                    <Collapse.Panel header='????????????????????????' key={1}>
                        <Select placeholder='???????????????' onChange={(year: any) => setYear(year)} defaultValue={2021}>
                            {yearList.map((element: any) => <Select.Option value={element}>{element}</Select.Option>)}
                        </Select>
                        <div className='chartContainer'>
                            <PieChart data={data_year} year={year} />
                        </div>
                    </Collapse.Panel>
                    <Collapse.Panel header='??????????????????????????????' key={2}>
                        <YearlyChart data={data_year} yearlist={yearList} />
                    </Collapse.Panel>
                    <Collapse.Panel header='??????????????????????????????' key={3}>
                        <MonthlyChart data={data_year} year={year} />
                    </Collapse.Panel>

                </Collapse>

            </div>
        </div>
    )
}










/*useEffect(() => {
        let tempData = [], tempDataIncome = [], tempDataExpend = [], incomeCatagorySorted: any = [], expendCatagorySorted: any = [];//???????????????????????????????????????
        let incomeSum = 0, expendSum = 0;//????????????
        let incomeOption = {}, expendOption = {};
        let incomeCatagory:any = [], expendCatagory:any = [];
        for (let element of data_year) {
            if (element.year === year) tempData = element.data;
        }
        for (let element of tempData) {
            if (element.cata === 'income') tempDataIncome.push(element);
            else tempDataExpend.push(element)
        };
        let expendState = false;
        for (let element of tempDataIncome) {
            let elementInArr = false
            if (incomeCatagorySorted.length == 0) incomeCatagorySorted.push({
                catagory: element.catagory,
                data: [element]
            })
            else {
                for (let i = 0, l = incomeCatagorySorted.length; i < l; i++) {
                    if (incomeCatagorySorted[i].catagory == element.catagory) {
                        incomeCatagorySorted[i] = {
                            catagory: element.catagory,
                            data: [...incomeCatagorySorted[i].data, ...[element]]
                        }
                        elementInArr = true
                    }
                }
                if (!elementInArr) incomeCatagorySorted.push({
                    catagory: element.catagory,
                    data: [element]
                })
            }
        }//????????????????????????????????????

        for (let element of incomeCatagorySorted) incomeSum += element.data.length;
        for (let i=0,l=incomeCatagorySorted.length;i<l;i++) {
            incomeCatagory.push(incomeCatagorySorted[i].catagory);
            Object.defineProperty(incomeOption,incomeCatagorySorted[i].catagory,{
                value:incomeCatagorySorted[i].data.length/incomeSum
            })
        }


    }, [yearList])
    */