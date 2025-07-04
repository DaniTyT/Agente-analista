// AWS Credentials

const ACCESS_KEY_ID = process.env.REACT_APP_ACCESS_KEY_ID;
const SECRET_ACCESS_KEY = process.env.REACT_APP_SECRET_ACCESS_KEY;
const AWS_REGION = process.env.REACT_APP_AWS_REGION;

// Amazon Bedrock Agent and DynamoDB Table

const AGENT_ID = process.env.REACT_APP_AGENT_ID;
const AGENT_ALIAS_ID = process.env.REACT_APP_AGENT_ALIAS_ID;
const QUESTION_ANSWERS_TABLE_NAME = process.env.REACT_APP_QUESTION_ANSWERS_TABLE_NAME;

// Application Information

const APP_NAME = "Asistente analista de datos ";
const APP_SUBJECT = "Video Games Sales";
const WELCOME_MESSAGE = "I'm your Video Games Sales Data Analyst, crunching data for insights.";

// --------------------------------

const MAX_LENGTH_INPUT_SEARCH = 140;
const MODEL_ID_FOR_CHART = process.env.REACT_APP_MODEL_ID_FOR_CHART;

const CHART_PROMPT =
  '\n\
Create detailed ApexCharts.js configurations based on the information provided to support the answer. Focus on meaningful data analysis and visually appealing charts.\n\
\n\
Input Data:\n\
\n\
<information>\n\
    <summary>\n\
        <<answer>>\n\
    </summary>\n\
    <data_sources>\n\
        <<data_sources>>\n\
    </data_sources>\n\
</information>\n\
\n\
The following is the only required output format for a Chart:\n\
\n\
<has_chart>1</has_chart>\n\
<chart_type>[bar/line/pie/etc]</chart_type>\n\
<chart_configuration>[JSON validate format with series and options]</chart_configuration>\n\
<caption>[Insightful analysis about the data chart in 20-40 words]</caption>\n\
\n\
If you do not have a chart configuration, use only the following output format:\n\
\n\
<has_chart>0</has_chart>\n\
<rationale>[The reason to do not generate a chart configuration, max 12 words]</rationale>\n\
\n\
- Provide the caption and chart information in the same language as the summary information.\n\
\n\
Chart Requirements:\n\
\n\
   - Provide only 1 chart configuration\n\
   - Use the appropriate chart type based on the data\n\
   - Each chart must include:\n\
      - Complete series and options configuration\n\
\n\
ApexChartsx Technical Specifications:\n\
\n\
    - Provide the formatter function value as a string in double quotes\n\
    - Use standard ApexCharts.js for React.js syntax\n\
    - Format all property names and string values with double quotes\n\
    - Include appropriate titles, subtitles and axis labels\n\
    - Configure for light mode viewing\n\
    - Use default text format styles\n\
    - Format decimal values to two places using formatter functions\n\
    - Use simple JavaScript functions (no moment.js)\n\
    - Format all numbers with thousands separators using toLocaleString() in all formatter functions.\n\
\n\
ApexChartsx Rules to Avoid Known Erros:\n\
\n\
   - Do not use Multiple Y Axis for bars, those are not supported.\n\
   - In JSON format, avoid the error: raise JSONDecodeError("Expecting value", s, err.value) from None\n\
   - Do not use undefined values\n\
\n\
Example Chart Configurations:\n\
\n\
<ChartExamples>\n\
  <Chart description="Line Basic">\n\
    <type>line</type>\n\
    <configuartion>\n\
{\n\
   "series":[\n\
      {\n\
         "name":"Desktops",\n\
         "data":[\n\
            10,\n\
            41,\n\
            35,\n\
            51,\n\
            49,\n\
            62,\n\
            69,\n\
            91,\n\
            148\n\
         ]\n\
      }\n\
   ],\n\
   "options":{\n\
      "chart":{\n\
         "height":420,\n\
         "type":"line",\n\
         "zoom":{\n\
            "enabled":false\n\
         }\n\
      },\n\
      "dataLabels":{\n\
         "enabled":false\n\
      },\n\
      "stroke":{\n\
         "curve":"straight"\n\
      },\n\
      "title":{\n\
         "text":"Product Trends by Month",\n\
         "align":"left"\n\
      },\n\
      "grid":{\n\
         "row":{\n\
            "colors":[\n\
               "#f3f3f3",\n\
               "transparent"\n\
            ],\n\
            "opacity":0.5\n\
         }\n\
      },\n\
      "xaxis":{\n\
         "categories":[\n\
            "Jan",\n\
            "Feb",\n\
            "Mar",\n\
            "Apr",\n\
            "May",\n\
            "Jun",\n\
            "Jul",\n\
            "Aug",\n\
            "Sep"\n\
         ]\n\
      }\n\
   }\n\
}\n\
    </configuartion>\n\
  </Chart>\n\
\n\
  <Chart description="Bar Funnel">\n\
    <type>bar</type>\n\
    <configuartion>\n\
{\n\
   "series":[\n\
      {\n\
         "name":"Funnel Series",\n\
         "data":[\n\
            1380,\n\
            1100,\n\
            990,\n\
            880,\n\
            740,\n\
            548,\n\
            330,\n\
            200\n\
         ]\n\
      }\n\
   ],\n\
   "options":{\n\
      "chart":{\n\
         "type":"bar",\n\
         "height":420,\n\
         "dropShadow":{\n\
            "enabled":true\n\
         }\n\
      },\n\
      "plotOptions":{\n\
         "bar":{\n\
            "borderRadius":0,\n\
            "horizontal":true,\n\
            "barHeight":"80%",\n\
            "isFunnel":true\n\
         }\n\
      },\n\
      "dataLabels":{\n\
         "enabled":true,\n\
         "formatter":"function (val, opt) { return val.toLocaleString(); }",\n\
         "dropShadow":{\n\
            "enabled":true\n\
         }\n\
      },\n\
      "title":{\n\
         "text":"Recruitment Funnel",\n\
         "align":"middle"\n\
      },\n\
      "xaxis":{\n\
         "categories":[\n\
            "Sourced",\n\
            "Screened",\n\
            "Assessed",\n\
            "HR Interview",\n\
            "Technical",\n\
            "Verify",\n\
            "Offered",\n\
            "Hired"\n\
         ]\n\
      },\n\
      "legend":{\n\
         "show":false\n\
      }\n\
   }\n\
}\n\
    <configuartion>\n\
  </Chart>\n\
\n\
  <Chart description="Bar Basic">\n\
    <type>bar</type>\n\
    <configuartion>\n\
{\n\
   "series":[\n\
      {\n\
         "data":[400,430,448,470,540,580,690,1100,1200,1380]\n\
      }\n\
   ],\n\
   "options":{\n\
      "chart":{\n\
         "type":"bar",\n\
         "height":420\n\
      },\n\
      "plotOptions":{\n\
         "bar":{\n\
            "borderRadius":4,\n\
            "borderRadiusApplication":"end",\n\
            "horizontal":true\n\
         }\n\
      },\n\
      "dataLabels":{\n\
         "enabled":false\n\
      },\n\
      "xaxis":{\n\
         "categories":["South Korea","Canada","United Kingdom","Netherlands","Italy","France","Japan","United States","China","Germany"]\n\
      }\n\
   }\n\
}\n\
    <configuartion>\n\
  </Chart>\n\
\n\
  <Chart description="Simple Pie">\n\
    <type>pie</type>\n\
    <configuartion>\n\
{\n\
  "series": [2077, 1036.75, 384.99, 277.49],\n\
  "options": {\n\
    "chart": {\n\
      "type": "pie",\n\
      "height": 420\n\
    },\n\
    "labels": ["North America", "Europe", "Other Regions", "Japan"],\n\
    "title": {\n\
      "text": "Video Game Sales Distribution by Region (2000-2010)",\n\
      "align": "center"\n\
    },\n\
    "subtitle": {\n\
      "text": "Total Global Sales: 3,779.72 million units",\n\
      "align": "center"\n\
    },\n\
    "dataLabels": {\n\
      "enabled": true,\n\
      "formatter": "function (val, opt) { return val.toLocaleString(); }"\n\
    },\n\
    "legend": {\n\
      "position": "bottom"\n\
    },\n\
    "colors": ["#008FFB", "#00E396", "#FEB019", "#FF4560"]\n\
  }\n\
}\n\
    <configuartion>\n\
  </Chart>\n\
\n\
</ChartExamples>';

export { AGENT_ID, 
    AGENT_ALIAS_ID, 
    CHART_PROMPT, 
    QUESTION_ANSWERS_TABLE_NAME, 
    APP_NAME, APP_SUBJECT, 
    WELCOME_MESSAGE, 
    MODEL_ID_FOR_CHART, 
    MAX_LENGTH_INPUT_SEARCH,
    ACCESS_KEY_ID,
    SECRET_ACCESS_KEY,
    AWS_REGION
};