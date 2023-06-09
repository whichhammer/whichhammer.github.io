import Head from "next/head";
import React, { useState } from 'react';
import Model, { ModelProps } from "../components/Model";
import { RadarData } from "@/lib/view/RadarData";
import { Highlighter, Token, Typeahead } from 'react-bootstrap-typeahead';
import { Option } from "react-bootstrap-typeahead/types/types";
import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-bootstrap-typeahead/css/Typeahead.bs5.css';
import type { EChartsOption } from "echarts";
import { ReactECharts } from "@/components/React-ECharts";

type Props = {
  feed: ModelProps[];
  fillColour: string[];
  strokeColour: string[];
};

const Home: React.FC<Props> = (props) => {
  const radarData = new RadarData();
  const options: ModelProps[] = props.feed;

  const [multiSelections, setMultiSelections] = useState<ModelProps[]>([] as ModelProps[]);

  if (multiSelections.length > 0) {
    radarData.setModels(multiSelections);
  }
  const data: any[] = [];
  radarData.getModels().map((model, index) => {
    data.push({
      value: radarData.getModelValues(model),
      name: model.name,
      itemStyle: {
        color: props.fillColour[index],
      },
      lineStyle: {
        color: props.strokeColour[index],
      },
      label: {
        show: true,
        formatter: function (params: any) {
          return params.value as string;
        }
      }
    });
  });

  const chartOptions: EChartsOption = {
    color: ['#67F9D8', '#FFE434', '#56A3F1', '#FF917C'],
    legend: {},
    responsive: true,
    maintainAspectRatio: true,
    renderer: 'svg',
    radar: {
      indicator: radarData.getIndicators(),
      radius: 120,
      axisName: {
        color: '#fff',
        backgroundColor: '#666',
        borderRadius: 3,
        padding: [3, 5]
      }
    },
    series: [
      {
        type: 'radar',
        emphasis: {
          lineStyle: {
            width: 4
          }
        },
        data: data
      },
    ]
  };

  return (
    <>
      <Head>
        <title>Whichhammer?</title>
        <meta
          name="description"
          content="Compare Warhammer 40k model stats side by side to see which fits your needs."
          key="desc"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css" />
      </Head>
      <main>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <nav className="navbar navbar-expand-lg navbar-light bg-light">

                <a className="navbar-brand" href="#">Whichhammer?</a>
                <Typeahead
                    id="basic-typeahead-multiple"
                    labelKey={(option: Option) => {
                      const m = option as ModelProps;
                      return `${m.datasheet.parent_faction_name} ${m.name}`
                    }}
                    multiple
                    onChange={(m) => setMultiSelections(m as ModelProps[])}
                    options={options}
                    placeholder="Choose several models..."
                    selected={multiSelections}
                    renderMenuItemChildren={(option: Option, { text }) => {
                      const m = option as ModelProps;
                      return (
                        <>
                          <Highlighter search={text}>{m.name}</Highlighter>,
                          <div>
                            <small>{m.datasheet.parent_faction_name}</small>
                          </div>
                        </>
                      )}
                    }
                    renderToken={(option: Option, { onRemove }, index) => {
                      const m = option as ModelProps;
                      return (
                        <Token key={index} onRemove={onRemove} option={m}>
                          {`${m.name}`}
                        </Token>
                      )
                    }}
                  />

              </nav>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12" id="chartContainer">
              <ReactECharts
                option={chartOptions}
                style={{margin: '0 auto'}}
              />
            </div>
          </div>
          <div className="row">
            {radarData.getModels().map((model, idx) => (
              <Model key={idx} idx={idx} m={model} />
            ))}
          </div>

        </div>

      </main>
      <div className="fixed-bottom footer">
        <div className="container">
          <div className="row">
            <div className="col-5">
              <p>
                Data provided by <a href="https://wahapedia.ru/wh40k9ed/the-rules/data-export/">wahapedia</a>
              </p>
            </div>
            <div className="col-5 ms-auto">
              <p className="text-right">
                Project code <a href="https://github.com/whichhammer/whichhammer.github.io"><i className="bi bi-github"></i></a><br />
                Cookies used for analytics
              </p>
            </div>
          </div>
        </div>

      </div>

    </>
  )
}



import fsPromises from 'fs/promises';
import path from 'path'
import Script from "next/script";
export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'data', 'feed.json');
  const jsonData = await fsPromises.readFile(filePath, 'utf8');
  const feed: ModelProps[] = JSON.parse(jsonData);

  return {
    props: {
      feed: feed ? feed : [],
      fillColour: ['red', 'blue', 'green', 'yellow', 'orange', 'purple', 'pink', 'brown', 'grey', 'black', 'white'],
      strokeColour: ['darkred', 'darkblue', 'darkgreen', 'darkyellow', 'darkorange', 'darkpurple', 'darkpink', 'darkbrown', 'darkgrey', 'darkblack', 'darkwhite'],
    }
  };
}

export default Home;
