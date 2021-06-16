import { Pie } from 'react-chartjs-2';
// import useFetch from './useFetch';
// import randomColor from 'randomcolor';
import React, { useEffect, useState } from 'react';
// import Chart from 'chart.js/auto';

// function TagsChart(q) {
//   const tags = useFetch('http://localhost:4000/api/tags/user/1');
//   console.log(tags);

//   const totalTags = tags?.length;
//   console.log(totalTags);

//   const repeatedTags = {};
//   console.log(repeatedTags);
//   tags?.forEach(function (tag) {
//     repeatedTags[tag] = (repeatedTags[tag] || 0) + 1;
//   });

//   const repeatedTagsValues = Object.values(repeatedTags);
//   console.log(repeatedTagsValues);
//   const repeatedTagsPercents = repeatedTagsValues.map(
//     (e) => (e * 100) / totalTags
//   );

//   console.log(repeatedTagsPercents);

//   const eachTag = [...new Set(tags)];
//   console.log(eachTag);

//   const color = repeatedTagsValues.map((e) =>
//     randomColor({
//       luminosity: 'random',
//       hue: 'random',
//     })
//   );
//   console.log(color);

//   const [chartData, setChartData] = useState({});
//   const chart = () => {
//     setChartData({
//       labels: eachTag,
//       datasets: [
//         {
//           label: 'Tags',
//           data: repeatedTagsPercents,
//           backgroundColor: color,
//         },
//       ],
//       borderWidth: 2,
//     });
//   };

//   useEffect(() => {
//     chart();
//   }, []);

//   // const data = {
//   //   title: eachTag,
//   //   value: repeatedTagsPercents,
//   //   color: color,
//   // };
//   // console.log(data);
//   // const options = {
//   //   responsive: true,
//   // };

//   return (
//     <div>
//       <h2>QUESO:</h2>
//       <div>{tags && <Pie data={chartData} />}</div>
//     </div>
//   );
// }

const TagsChart = () => {
    const [chartData, setChartData] = useState({});
    const chart = () => {
        setChartData({
            labels: ['css', 'php', 'sql'],
            datasets: [
                {
                    label: 'Tags',
                    data: [20, 40, 40],
                    backgroundColor: [
                        'rgba(75, 192, 192, 0.6',
                        'rgba(75, 100, 192, 0.6',

                        'rgba(75, 15, 192, 0.6',
                    ],

                    borderWidth: 4,
                },
            ],
        });
    };
    useEffect(() => {
        chart();
    }, []);

    return (
        <div>
            <Pie data={chartData} />
        </div>
    );
};

export default TagsChart;
