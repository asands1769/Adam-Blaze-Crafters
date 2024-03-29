import mapboxgl from 'mapbox-gl';
import React, { useEffect } from 'react';
import "../../../index.css";
import "./searchStyles.css";
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiZHVzdGluZnJpZXNlbiIsImEiOiJjbHB0eDVyN2cwZmx0Mmtuem8zZDJua3lmIn0.tDrxvISZrAzUKW_VUv9zqg';

const FilterMap = () => {
  
 useEffect(() => {
    const map = new mapboxgl.Map({
        container: 'map',
        // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [-92.554322, 38.390511],
        maxZoom: 15,
        minZoom: 1,
        zoom: 5
        });
         
        // Holds visible airport features for filtering
        let airports = [];
         
        // Create a popup, but don't add it to the map yet.
        const popup = new mapboxgl.Popup({
        closeButton: false
        });
         
        const filterEl = document.getElementById('feature-filter');
        const listingEl = document.getElementById('feature-listing');
         
        function renderListings(features) {
        const empty = document.createElement('p');
        // Clear any existing listings
        listingEl.innerHTML = '';
        if (features.length) {
        for (const feature of features) {
        const itemLink = document.createElement('a');
        const label = feature.properties.LOC_NAME;
        itemLink.href = feature.properties.URL;
        itemLink.target = '_blank';
        itemLink.textContent = label;
        itemLink.addEventListener('mouseover', () => {
        // Highlight corresponding feature on the map
        popup
        .setLngLat(feature.geometry.coordinates)
        .setText(label)
        .addTo(map);
        });
        listingEl.appendChild(itemLink);
        }
         
        // Show the filter input
        filterEl.parentNode.style.display = 'block';
        } else if (features.length === 0 && filterEl.value !== '') {
        empty.textContent = 'No results found';
        listingEl.appendChild(empty);
        } else {
        empty.textContent = 'Drag the map to populate results';
        listingEl.appendChild(empty);
         
        // Hide the filter input
        filterEl.parentNode.style.display = 'none';
         
        // remove features filter
        map.setFilter('airport', ['has', 'PARK_ID']);
        }
        }
         
        function normalize(string) {
            return string.trim().toLowerCase();
        }
         
        // Because features come from tiled vector data,
        // feature geometries may be split
        // or duplicated across tile boundaries.
        // As a result, features may appear
        // multiple times in query results.
        function getUniqueFeatures(features) {
        const uniqueIds = new Set();
        const uniqueFeatures = [];
        for (const feature of features) {
        const id = feature.properties.PARK_ID;
        if (!uniqueIds.has(id)) {
        uniqueIds.add(id);
        uniqueFeatures.push(feature);
        }
        }
        return uniqueFeatures;
        }
         
        map.on('load', () => {
        map.addSource('airports', {
        'type': 'geojson',
        'data': {
            "type": "FeatureCollection",
            "features": [
              {
                "type": "Feature",
                "properties": {
                  "OBJECTID": 979,
                  "LOC_NAME": "Ha Ha Tonka State Park",
                  "PARK_ID": 4303,
                  "URL": "http://mostateparks.com/park/ha-ha-tonka-state-park",
                  "SHORT_NAME": "Ha Ha Tonka SP",
                  "REGION": "Ozark Region",
                  "PARK_TYPE": "State Park",
                  "GIS_ACRES": 3826.38989257
                },
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    -92.76354566426453,
                    37.96786290349126
                  ]
                }
              },
              {
                "type": "Feature",
                "properties": {
                  "OBJECTID": 980,
                  "LOC_NAME": "Arrow Rock State Historic Site",
                  "PARK_ID": 4101,
                  "URL": "http://mostateparks.com/park/arrow-rock-state-historic-site",
                  "SHORT_NAME": "Arrow Rock SHS",
                  "REGION": "Northern Region",
                  "PARK_TYPE": "State Historic Site",
                  "GIS_ACRES": 171.6349945
                },
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    -92.94457445908155,
                    39.065044568771164
                  ]
                }
              },
              {
                "type": "Feature",
                "properties": {
                  "OBJECTID": 981,
                  "LOC_NAME": "Edward \"Ted\" and Pat Jones-Confluence Point State Park",
                  "PARK_ID": 4232,
                  "URL": "http://mostateparks.com/park/edward-ted-and-pat-jones-confluence-point-state-park",
                  "SHORT_NAME": "Confluence Point SP",
                  "REGION": "Northern Region",
                  "PARK_TYPE": "State Park",
                  "GIS_ACRES": 1125.69995117
                },
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    -90.12385407093906,
                    38.83490797600394
                  ]
                }
              },
              {
                "type": "Feature",
                "properties": {
                  "OBJECTID": 982,
                  "LOC_NAME": "Wallace State Park",
                  "PARK_ID": 4117,
                  "URL": "http://mostateparks.com/park/wallace-state-park",
                  "SHORT_NAME": "Wallace SP",
                  "REGION": "Northern Region",
                  "PARK_TYPE": "State Park",
                  "GIS_ACRES": 476.38198852
                },
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    -94.21674925233187,
                    39.655797897833764
                  ]
                }
              },
              {
                "type": "Feature",
                "properties": {
                  "OBJECTID": 983,
                  "LOC_NAME": "Weston Bend State Park",
                  "PARK_ID": 4119,
                  "URL": "http://mostateparks.com/park/weston-bend-state-park",
                  "SHORT_NAME": "Weston Bend SP",
                  "REGION": "Northern Region",
                  "PARK_TYPE": "State Park",
                  "GIS_ACRES": 1096.47998046
                },
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    -94.87610680987113,
                    39.39037110358824
                  ]
                }
              },
              {
                "type": "Feature",
                "properties": {
                  "OBJECTID": 984,
                  "LOC_NAME": "Nathan and Olive Boone Homestead State Historic Site",
                  "PARK_ID": 4313,
                  "URL": "https://mostateparks.com/park/nathan-and-olive-boone-homestead-state-historic-site",
                  "SHORT_NAME": "Boone Homestead SHS",
                  "REGION": "Ozark Region",
                  "PARK_TYPE": "State Historic Site",
                  "GIS_ACRES": 400.77099609
                },
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    -93.57258896912677,
                    37.344324109760684
                  ]
                }
              },
              {
                "type": "Feature",
                "properties": {
                  "OBJECTID": 985,
                  "LOC_NAME": "St. Francois State Park",
                  "PARK_ID": 4216,
                  "URL": "http://mostateparks.com/park/st-francois-state-park",
                  "SHORT_NAME": "St Francois SP",
                  "REGION": "Eastern Region",
                  "PARK_TYPE": "State Park",
                  "GIS_ACRES": 2579.95996093
                },
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    -90.52158624754239,
                    37.972099991491866
                  ]
                }
              },
              {
                "type": "Feature",
                "properties": {
                  "OBJECTID": 986,
                  "LOC_NAME": "Thomas Hart Benton Home and Studio State Historic Site",
                  "PARK_ID": 4120,
                  "URL": "http://mostateparks.com/park/thomas-hart-benton-home-and-studio-state-historic-site",
                  "SHORT_NAME": "Benton Home & Studio SHS",
                  "REGION": "Northern Region",
                  "PARK_TYPE": "State Historic Site",
                  "GIS_ACRES": 0.30511701
                },
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    -94.59784907425424,
                    39.06209108134429
                  ]
                }
              },
              {
                "type": "Feature",
                "properties": {
                  "OBJECTID": 987,
                  "LOC_NAME": "Harry S Truman Birthplace State Historic Site",
                  "PARK_ID": 4309,
                  "URL": "http://mostateparks.com/park/harry-s-truman-birthplace-state-historic-site",
                  "SHORT_NAME": "Truman Birthplace SHS",
                  "REGION": "Ozark Region",
                  "PARK_TYPE": "State Historic Site",
                  "GIS_ACRES": 2.48195004
                },
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    -94.27097033006,
                    37.49395017070493
                  ]
                }
              },
              {
                "type": "Feature",
                "properties": {
                  "OBJECTID": 988,
                  "LOC_NAME": "Stockton State Park",
                  "PARK_ID": 9004,
                  "URL": "http://mostateparks.com/park/stockton-state-park",
                  "SHORT_NAME": "Stockton SP",
                  "REGION": "Ozark Region",
                  "PARK_TYPE": "State Park",
                  "GIS_ACRES": 2081.25
                },
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    -93.75062217584403,
                    37.60690832755519
                  ]
                }
              },
              {
                "type": "Feature",
                "properties": {
                  "OBJECTID": 989,
                  "LOC_NAME": "Morris State Park",
                  "PARK_ID": 4231,
                  "URL": "http://mostateparks.com/park/morris-state-park",
                  "SHORT_NAME": "Morris SP",
                  "REGION": "Eastern Region",
                  "PARK_TYPE": "State Park",
                  "GIS_ACRES": 160.81300354
                },
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    -90.04000845742698,
                    36.55056296905489
                  ]
                }
              },
              {
                "type": "Feature",
                "properties": {
                  "OBJECTID": 990,
                  "LOC_NAME": "Onondaga Cave State Park",
                  "PARK_ID": 4215,
                  "URL": "http://mostateparks.com/park/onondaga-cave-state-park",
                  "SHORT_NAME": "Onondaga Cave SP",
                  "REGION": "Eastern Region",
                  "PARK_TYPE": "State Park",
                  "GIS_ACRES": 1386.41003417
                },
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    -91.23601031851923,
                    38.060550849438584
                  ]
                }
              },
              {
                "type": "Feature",
                "properties": {
                  "OBJECTID": 991,
                  "LOC_NAME": "Gen. John J. Pershing Boyhood Home State Historic Site",
                  "PARK_ID": 4112,
                  "URL": "http://mostateparks.com/park/gen-john-j-pershing-boyhood-home-state-historic-site",
                  "SHORT_NAME": "Pershing Boyhood Home SHS",
                  "REGION": "Northern Region",
                  "PARK_TYPE": "State Historic Site",
                  "GIS_ACRES": 5.34723997
                },
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    -93.17032809806072,
                    39.78937742479565
                  ]
                }
              },
              {
                "type": "Feature",
                "properties": {
                  "OBJECTID": 992,
                  "LOC_NAME": "Prairie State Park",
                  "PARK_ID": 4307,
                  "URL": "http://mostateparks.com/park/prairie-state-park",
                  "SHORT_NAME": "Prairie SP",
                  "REGION": "Ozark Region",
                  "PARK_TYPE": "State Park",
                  "GIS_ACRES": 3971.01000976
                },
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    -94.55345367943485,
                    37.51939105110548
                  ]
                }
              },
              {
                "type": "Feature",
                "properties": {
                  "OBJECTID": 993,
                  "LOC_NAME": "Osage Village State Historic Site",
                  "PARK_ID": 4311,
                  "URL": "http://mostateparks.com/park/osage-village-state-historic-site",
                  "SHORT_NAME": "Osage Village SHS",
                  "REGION": "Ozark Region",
                  "PARK_TYPE": "State Historic Site",
                  "GIS_ACRES": 99.62220001
                },
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    -94.20705950495005,
                    37.981661622587104
                  ]
                }
              },
              {
                "type": "Feature",
                "properties": {
                  "OBJECTID": 994,
                  "LOC_NAME": "Elephant Rocks State Park",
                  "PARK_ID": 4208,
                  "URL": "http://mostateparks.com/park/elephant-rocks-state-park",
                  "SHORT_NAME": "Elephant Rocks SP",
                  "REGION": "Eastern Region",
                  "PARK_TYPE": "State Park",
                  "GIS_ACRES": 145.18600463
                },
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    -90.68845027912366,
                    37.654733077921726
                  ]
                }
              },
              {
                "type": "Feature",
                "properties": {
                  "OBJECTID": 995,
                  "LOC_NAME": "Mastodon State Historic Site",
                  "PARK_ID": 4202,
                  "URL": "http://mostateparks.com/park/mastodon-state-historic-site",
                  "SHORT_NAME": "Mastodon SHS",
                  "REGION": "Eastern Region",
                  "PARK_TYPE": "State Historic Site",
                  "GIS_ACRES": 420.49600219
                },
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    -90.39321727497158,
                    38.378780701718185
                  ]
                }
              },
              {
                "type": "Feature",
                "properties": {
                  "OBJECTID": 996,
                  "LOC_NAME": "Finger Lakes State Park",
                  "PARK_ID": 4107,
                  "URL": "http://mostateparks.com/park/finger-lakes-state-park",
                  "SHORT_NAME": "Finger Lakes SP",
                  "REGION": "Northern Region",
                  "PARK_TYPE": "State Park",
                  "GIS_ACRES": 1050.22998046
                },
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    -92.31885134910675,
                    39.08947734095997
                  ]
                }
              },
              {
                "type": "Feature",
                "properties": {
                  "OBJECTID": 997,
                  "LOC_NAME": "Clark's Hill/Norton State Historic Site",
                  "PARK_ID": 4315,
                  "URL": "http://mostateparks.com/park/clarks-hillnorton-state-historic-site",
                  "SHORT_NAME": "Clark's Hill/Norton SHS",
                  "REGION": "Northern Region",
                  "PARK_TYPE": "State Historic Site",
                  "GIS_ACRES": 13.03209972
                },
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    -92.02618216260153,
                    38.560344967204244
                  ]
                }
              },
              {
                "type": "Feature",
                "properties": {
                  "OBJECTID": 998,
                  "LOC_NAME": "Confederate Memorial State Historic Site",
                  "PARK_ID": 4105,
                  "URL": "http://mostateparks.com/park/confederate-memorial-state-historic-site",
                  "SHORT_NAME": "Confederate Memorial SHS",
                  "REGION": "Northern Region",
                  "PARK_TYPE": "State Historic Site",
                  "GIS_ACRES": 141.47599792
                },
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    -93.72644167845674,
                    39.097558799051555
                  ]
                }
              },
              {
                "type": "Feature",
                "properties": {
                  "OBJECTID": 999,
                  "LOC_NAME": "Sam A. Baker State Park",
                  "PARK_ID": 4218,
                  "URL": "http://mostateparks.com/park/sam-baker-state-park",
                  "SHORT_NAME": "Sam A Baker SP",
                  "REGION": "Eastern Region",
                  "PARK_TYPE": "State Park",
                  "GIS_ACRES": 5582.1899414
                },
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    -90.52683539400397,
                    37.25896787863403
                  ]
                }
              },
              {
                "type": "Feature",
                "properties": {
                  "OBJECTID": 1000,
                  "LOC_NAME": "Crowder State Park",
                  "PARK_ID": 4106,
                  "URL": "http://mostateparks.com/park/crowder-state-park",
                  "SHORT_NAME": "Crowder SP",
                  "REGION": "Northern Region",
                  "PARK_TYPE": "State Park",
                  "GIS_ACRES": 1973.56005859
                },
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    -93.67527977096938,
                    40.10518122040246
                  ]
                }
              },
              {
                "type": "Feature",
                "properties": {
                  "OBJECTID": 1001,
                  "LOC_NAME": "Deutschheim State Historic Site",
                  "PARK_ID": 4207,
                  "URL": "http://mostateparks.com/park/deutschheim-state-historic-site",
                  "SHORT_NAME": "Deutschheim SHS",
                  "REGION": "Eastern Region",
                  "PARK_TYPE": "State Historic Site",
                  "GIS_ACRES": 0.69242697
                },
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    -91.43851172608765,
                    38.706259480388155
                  ]
                }
              },
              {
                "type": "Feature",
                "properties": {
                  "OBJECTID": 1002,
                  "LOC_NAME": "Big Sugar Creek State Park",
                  "PARK_ID": 4314,
                  "URL": "http://mostateparks.com/park/big-sugar-creek-state-park",
                  "SHORT_NAME": "Big Sugar Creek SP",
                  "REGION": "Ozark Region",
                  "PARK_TYPE": "State Park",
                  "GIS_ACRES": 2079.12988281
                },
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    -94.28634991096244,
                    36.62931719622177
                  ]
                }
              },
              {
                "type": "Feature",
                "properties": {
                  "OBJECTID": 1003,
                  "LOC_NAME": "Boone's Lick State Historic Site",
                  "PARK_ID": 4124,
                  "URL": "http://mostateparks.com/park/boones-lick-state-historic-site",
                  "SHORT_NAME": "Boone's Lick SHS",
                  "REGION": "Northern Region",
                  "PARK_TYPE": "State Historic Site",
                  "GIS_ACRES": 52.59420013
                },
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    -92.87755313525071,
                    39.081562385072026
                  ]
                }
              },
              {
                "type": "Feature",
                "properties": {
                  "OBJECTID": 1004,
                  "LOC_NAME": "Bothwell Lodge State Historic Site",
                  "PARK_ID": 4302,
                  "URL": "http://mostateparks.com/park/bothwell-lodge-state-historic-site",
                  "SHORT_NAME": "Bothwell Lodge SHS",
                  "REGION": "Northern Region",
                  "PARK_TYPE": "State Historic Site",
                  "GIS_ACRES": 235.66900634
                },
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    -93.21709254166241,
                    38.79137047928481
                  ]
                }
              },
              {
                "type": "Feature",
                "properties": {
                  "OBJECTID": 1005,
                  "LOC_NAME": "Dillard Mill State Historic Site",
                  "PARK_ID": 9008,
                  "URL": "http://mostateparks.com/park/dillard-mill-state-historic-site",
                  "SHORT_NAME": "Dillard Mill SHS",
                  "REGION": "Eastern Region",
                  "PARK_TYPE": "State Historic Site",
                  "GIS_ACRES": 133.08000183
                },
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    -91.20513370009986,
                    37.71855669397461
                  ]
                }
              },
              {
                "type": "Feature",
                "properties": {
                  "OBJECTID": 1006,
                  "LOC_NAME": "Pershing State Park",
                  "PARK_ID": 4111,
                  "URL": "http://mostateparks.com/park/pershing-state-park",
                  "SHORT_NAME": "Pershing SP",
                  "REGION": "Northern Region",
                  "PARK_TYPE": "State Park",
                  "GIS_ACRES": 5392.02001953
                },
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    -93.23101216101198,
                    39.7626932735553
                  ]
                }
              },
              {
                "type": "Feature",
                "properties": {
                  "OBJECTID": 1007,
                  "LOC_NAME": "Mark Twain Birthplace State Historic Site",
                  "PARK_ID": 4126,
                  "URL": "http://mostateparks.com/park/mark-twain-birthplace-state-historic-site",
                  "SHORT_NAME": "Mark Twain Birthplace SHS",
                  "REGION": "Northern Region",
                  "PARK_TYPE": "State Historic Site",
                  "GIS_ACRES": 1.83478999
                },
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    -91.78623980327126,
                    39.49284348746995
                  ]
                }
              },
              {
                "type": "Feature",
                "properties": {
                  "OBJECTID": 1008,
                  "LOC_NAME": "Union Covered Bridge State Historic Site",
                  "PARK_ID": 4123,
                  "URL": "http://mostateparks.com/park/union-covered-bridge-state-historic-site",
                  "SHORT_NAME": "Union Covered Bridge SHS",
                  "REGION": "Northern Region",
                  "PARK_TYPE": "State Historic Site",
                  "GIS_ACRES": 2.50493001
                },
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    -92.10250609744102,
                    39.432947542957834
                  ]
                }
              },
              {
                "type": "Feature",
                "properties": {
                  "OBJECTID": 1009,
                  "LOC_NAME": "Annie and Abel Van Meter State Park",
                  "PARK_ID": 4115,
                  "URL": "http://mostateparks.com/park/van-meter-state-park",
                  "SHORT_NAME": "Van Meter SP",
                  "REGION": "Northern Region",
                  "PARK_TYPE": "State Park",
                  "GIS_ACRES": 1123.56994628
                },
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    -93.2609225033208,
                    39.274507832109634
                  ]
                }
              },
              {
                "type": "Feature",
                "properties": {
                  "OBJECTID": 1010,
                  "LOC_NAME": "Battle of Lexington State Historic Site",
                  "PARK_ID": 4103,
                  "URL": "http://mostateparks.com/park/battle-lexington-state-historic-site",
                  "SHORT_NAME": "Battle of Lexington SHS",
                  "REGION": "Northern Region",
                  "PARK_TYPE": "State Historic Site",
                  "GIS_ACRES": 92.89029693
                },
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    -93.87805566490437,
                    39.19374494285127
                  ]
                }
              },
              {
                "type": "Feature",
                "properties": {
                  "OBJECTID": 1011,
                  "LOC_NAME": "Cuivre River State Park",
                  "PARK_ID": 4206,
                  "URL": "http://mostateparks.com/park/cuivre-river-state-park",
                  "SHORT_NAME": "Cuivre River SP",
                  "REGION": "Eastern Region",
                  "PARK_TYPE": "State Park",
                  "GIS_ACRES": 6363.54980468
                },
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    -90.93344165045653,
                    39.036979156199045
                  ]
                }
              },
              {
                "type": "Feature",
                "properties": {
                  "OBJECTID": 1012,
                  "LOC_NAME": "Jewell Cemetery State Historic Site",
                  "PARK_ID": 4125,
                  "URL": "http://mostateparks.com/park/jewell-cemetery-state-historic-site",
                  "SHORT_NAME": "Jewell Cemetery SHS",
                  "REGION": "Northern Region",
                  "PARK_TYPE": "State Historic Site",
                  "GIS_ACRES": 0.43820598
                },
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    -92.33623012249049,
                    38.919801856600664
                  ]
                }
              },
              {
                "type": "Feature",
                "properties": {
                  "OBJECTID": 1013,
                  "LOC_NAME": "Rock Bridge Memorial State Park",
                  "PARK_ID": 4113,
                  "URL": "http://mostateparks.com/park/rock-bridge-memorial-state-park",
                  "SHORT_NAME": "Rock Bridge SP",
                  "REGION": "Northern Region",
                  "PARK_TYPE": "State Park",
                  "GIS_ACRES": 2131.88989257
                },
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    -92.31775676071712,
                    38.87331667762531
                  ]
                }
              },
              {
                "type": "Feature",
                "properties": {
                  "OBJECTID": 1014,
                  "LOC_NAME": "Knob Noster State Park",
                  "PARK_ID": 4304,
                  "URL": "http://mostateparks.com/park/knob-noster-state-park",
                  "SHORT_NAME": "Knob Noster SP",
                  "REGION": "Northern Region",
                  "PARK_TYPE": "State Park",
                  "GIS_ACRES": 3631.11010742
                },
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    -93.60364075594563,
                    38.74427402840905
                  ]
                }
              },
              {
                "type": "Feature",
                "properties": {
                  "OBJECTID": 1015,
                  "LOC_NAME": "Jefferson Landing State Historic Site",
                  "PARK_ID": 4310,
                  "URL": "http://mostateparks.com/park/missouri-state-museum",
                  "SHORT_NAME": "Missouri State Museum",
                  "REGION": "Northern Region",
                  "PARK_TYPE": "State Historic Site",
                  "GIS_ACRES": 2.69693994
                },
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    -92.1703788689432,
                    38.578627243303636
                  ]
                }
              },
              {
                "type": "Feature",
                "properties": {
                  "OBJECTID": 1016,
                  "LOC_NAME": "Table Rock State Park",
                  "PARK_ID": 9005,
                  "URL": "http://mostateparks.com/park/table-rock-state-park",
                  "SHORT_NAME": "Table Rock SP",
                  "REGION": "Ozark Region",
                  "PARK_TYPE": "State Park",
                  "GIS_ACRES": 368.6000061
                },
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    -93.30520572694378,
                    36.5846760466895
                  ]
                }
              },
              {
                "type": "Feature",
                "properties": {
                  "OBJECTID": 1017,
                  "LOC_NAME": "Big Oak Tree State Park",
                  "PARK_ID": 4203,
                  "URL": "http://mostateparks.com/park/big-oak-tree-state-park",
                  "SHORT_NAME": "Big Oak Tree SP",
                  "REGION": "Eastern Region",
                  "PARK_TYPE": "State Park",
                  "GIS_ACRES": 1043.32995605
                },
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    -89.30228370267898,
                    36.64641914832908
                  ]
                }
              },
              {
                "type": "Feature",
                "properties": {
                  "OBJECTID": 1018,
                  "LOC_NAME": "Trail of Tears State Park",
                  "PARK_ID": 4220,
                  "URL": "http://mostateparks.com/park/trail-tears-state-park",
                  "SHORT_NAME": "Trail of Tears SP",
                  "REGION": "Eastern Region",
                  "PARK_TYPE": "State Park",
                  "GIS_ACRES": 3484.66992187
                },
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    -89.48211814954722,
                    37.45742912331841
                  ]
                }
              },
              {
                "type": "Feature",
                "properties": {
                  "OBJECTID": 1019,
                  "LOC_NAME": "Battle of Pilot Knob State Historic Site",
                  "PARK_ID": 4226,
                  "URL": "http://mostateparks.com/park/battle-pilot-knob-state-historic-site",
                  "SHORT_NAME": "Battle of Pilot Knob SHS",
                  "REGION": "Eastern Region",
                  "PARK_TYPE": "State Historic Site",
                  "GIS_ACRES": 71.78759765
                },
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    -90.63796924491518,
                    37.61911206607148
                  ]
                }
              },
              {
                "type": "Feature",
                "properties": {
                  "OBJECTID": 1020,
                  "LOC_NAME": "Bennett Spring State Park",
                  "PARK_ID": 4301,
                  "URL": "http://mostateparks.com/park/bennett-spring-state-park",
                  "SHORT_NAME": "Bennett Spring SP",
                  "REGION": "Ozark Region",
                  "PARK_TYPE": "State Park",
                  "GIS_ACRES": 2983.80004882
                },
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    -92.84074257189499,
                    37.70452050825995
                  ]
                }
              },
              {
                "type": "Feature",
                "properties": {
                  "OBJECTID": 1021,
                  "LOC_NAME": "Pomme de Terre State Park",
                  "PARK_ID": 9007,
                  "URL": "http://mostateparks.com/park/pomme-de-terre-state-park",
                  "SHORT_NAME": "Pomme De Terre SP",
                  "REGION": "Ozark Region",
                  "PARK_TYPE": "State Park",
                  "GIS_ACRES": 756.79101562
                },
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    -93.31283511975886,
                    37.88223288823142
                  ]
                }
              },
              {
                "type": "Feature",
                "properties": {
                  "OBJECTID": 1022,
                  "LOC_NAME": "Washington State Park",
                  "PARK_ID": 4221,
                  "URL": "http://mostateparks.com/park/washington-state-park",
                  "SHORT_NAME": "Washington SP",
                  "REGION": "Eastern Region",
                  "PARK_TYPE": "State Park",
                  "GIS_ACRES": 2150.17993164
                },
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    -90.69213609179631,
                    38.08475130072147
                  ]
                }
              },
              {
                "type": "Feature",
                "properties": {
                  "OBJECTID": 1023,
                  "LOC_NAME": "Lake of the Ozarks State Park",
                  "PARK_ID": 4305,
                  "URL": "http://mostateparks.com/park/lake-ozarks-state-park",
                  "SHORT_NAME": "Lake of The Ozarks SP",
                  "REGION": "Ozark Region",
                  "PARK_TYPE": "State Park",
                  "GIS_ACRES": 21143.19921875
                },
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    -92.59359474642534,
                    38.099158662393165
                  ]
                }
              },
              {
                "type": "Feature",
                "properties": {
                  "OBJECTID": 1024,
                  "LOC_NAME": "Meramec State Park",
                  "PARK_ID": 4214,
                  "URL": "http://mostateparks.com/park/meramec-state-park",
                  "SHORT_NAME": "Meramec SP",
                  "REGION": "Eastern Region",
                  "PARK_TYPE": "State Park",
                  "GIS_ACRES": 6672.85986328
                },
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    -91.10002137750912,
                    38.208050417456114
                  ]
                }
              },
              {
                "type": "Feature",
                "properties": {
                  "OBJECTID": 1025,
                  "LOC_NAME": "Sandy Creek Covered Bridge State Historic Site",
                  "PARK_ID": 4222,
                  "URL": "http://mostateparks.com/park/sandy-creek-covered-bridge-state-historic-site",
                  "SHORT_NAME": "Sandy Creek Covered Bridge SHS",
                  "REGION": "Eastern Region",
                  "PARK_TYPE": "State Historic Site",
                  "GIS_ACRES": 208.09599304
                },
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    -90.52780998435989,
                    38.28644384515165
                  ]
                }
              },
              {
                "type": "Feature",
                "properties": {
                  "OBJECTID": 1026,
                  "LOC_NAME": "Mark Twain State Park",
                  "PARK_ID": 4110,
                  "URL": "http://mostateparks.com/park/mark-twain-state-park",
                  "SHORT_NAME": "Mark Twain SP",
                  "REGION": "Northern Region",
                  "PARK_TYPE": "State Park",
                  "GIS_ACRES": 2565.1899414
                },
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    -91.80650729523283,
                    39.48819440497749
                  ]
                }
              },
              {
                "type": "Feature",
                "properties": {
                  "OBJECTID": 1027,
                  "LOC_NAME": "Battle of Carthage State Historic Site",
                  "PARK_ID": 4312,
                  "URL": "http://mostateparks.com/park/battle-carthage-state-historic-site",
                  "SHORT_NAME": "Battle of Carthage SHS",
                  "REGION": "Ozark Region",
                  "PARK_TYPE": "State Historic Site",
                  "GIS_ACRES": 7.98207998
                },
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    -94.29774248341212,
                    37.17381454145905
                  ]
                }
              },
              {
                "type": "Feature",
                "properties": {
                  "OBJECTID": 1028,
                  "LOC_NAME": "Hawn State Park",
                  "PARK_ID": 4211,
                  "URL": "http://mostateparks.com/park/hawn-state-park",
                  "SHORT_NAME": "Hawn SP",
                  "REGION": "Eastern Region",
                  "PARK_TYPE": "State Park",
                  "GIS_ACRES": 5012.99023437
                },
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    -90.24239734352665,
                    37.82108689348564
                  ]
                }
              },
              {
                "type": "Feature",
                "properties": {
                  "OBJECTID": 1029,
                  "LOC_NAME": "Lewis and Clark State Park",
                  "PARK_ID": 4108,
                  "URL": "http://mostateparks.com/park/lewis-and-clark-state-park",
                  "SHORT_NAME": "Lewis & Clark SP",
                  "REGION": "Northern Region",
                  "PARK_TYPE": "State Park",
                  "GIS_ACRES": 179.58000183
                },
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    -95.0566400433858,
                    39.53677479785724
                  ]
                }
              },
              {
                "type": "Feature",
                "properties": {
                  "OBJECTID": 1030,
                  "LOC_NAME": "Missouri Mines State Historic Site",
                  "PARK_ID": 4228,
                  "URL": "http://mostateparks.com/park/missouri-mines-state-historic-site",
                  "SHORT_NAME": "Missouri Mines SHS",
                  "REGION": "Eastern Region",
                  "PARK_TYPE": "State Historic Site",
                  "GIS_ACRES": 36.72309875
                },
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    -90.50941786454838,
                    37.83798996875132
                  ]
                }
              },
              {
                "type": "Feature",
                "properties": {
                  "OBJECTID": 1031,
                  "LOC_NAME": "St. Joe State Park",
                  "PARK_ID": 4217,
                  "URL": "http://mostateparks.com/park/st-joe-state-park",
                  "SHORT_NAME": "St Joe SP",
                  "REGION": "Eastern Region",
                  "PARK_TYPE": "State Park",
                  "GIS_ACRES": 8330.38964843
                },
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    -90.50258858293051,
                    37.80738882476116
                  ]
                }
              },
              {
                "type": "Feature",
                "properties": {
                  "OBJECTID": 1032,
                  "LOC_NAME": "Wakonda State Park",
                  "PARK_ID": 4116,
                  "URL": "http://mostateparks.com/park/wakonda-state-park",
                  "SHORT_NAME": "Wakonda SP",
                  "REGION": "Northern Region",
                  "PARK_TYPE": "State Park",
                  "GIS_ACRES": 1032.63000488
                },
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    -91.51139525112036,
                    40.0050338575106
                  ]
                }
              },
              {
                "type": "Feature",
                "properties": {
                  "OBJECTID": 1033,
                  "LOC_NAME": "Watkins Woolen Mill State Park and Historic Site",
                  "PARK_ID": 4127,
                  "URL": "http://mostateparks.com/park/watkins-mill-state-park",
                  "SHORT_NAME": "Watkins Mill SP",
                  "REGION": "Northern Region",
                  "PARK_TYPE": "State Park",
                  "GIS_ACRES": 1530.63000488
                },
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    -94.25848601394772,
                    39.404771877971235
                  ]
                }
              },
              {
                "type": "Feature",
                "properties": {
                  "OBJECTID": 1034,
                  "LOC_NAME": "Johnson's Shut-Ins State Park",
                  "PARK_ID": 4213,
                  "URL": "http://mostateparks.com/park/johnsons-shut-ins-state-park",
                  "SHORT_NAME": "Johnson's Shut-Ins SP",
                  "REGION": "Eastern Region",
                  "PARK_TYPE": "State Park",
                  "GIS_ACRES": 9423.33007812
                },
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    -90.87582125176465,
                    37.562766512548755
                  ]
                }
              },
              {
                "type": "Feature",
                "properties": {
                  "OBJECTID": 1035,
                  "LOC_NAME": "Hunter-Dawson State Historic Site",
                  "PARK_ID": 4212,
                  "URL": "http://mostateparks.com/park/hunter-dawson-state-historic-site",
                  "SHORT_NAME": "Hunter-Dawson SHS",
                  "REGION": "Eastern Region",
                  "PARK_TYPE": "State Historic Site",
                  "GIS_ACRES": 18.76230049
                },
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    -89.52350296600642,
                    36.59664661834896
                  ]
                }
              },
              {
                "type": "Feature",
                "properties": {
                  "OBJECTID": 1036,
                  "LOC_NAME": "Gov. Daniel Dunklin's Grave State Historic Site",
                  "PARK_ID": 4223,
                  "URL": "http://mostateparks.com/park/gov-daniel-dunklins-grave-state-historic-site",
                  "SHORT_NAME": "Dunkllin's Grave SHS",
                  "REGION": "Eastern Region",
                  "PARK_TYPE": "State Historic Site",
                  "GIS_ACRES": 1.37074005
                },
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    -90.37666246387074,
                    38.28050289593953
                  ]
                }
              },
              {
                "type": "Feature",
                "properties": {
                  "OBJECTID": 1037,
                  "LOC_NAME": "Graham Cave State Park",
                  "PARK_ID": 4210,
                  "URL": "http://mostateparks.com/park/graham-cave-state-park",
                  "SHORT_NAME": "Graham Cave SP",
                  "REGION": "Northern Region",
                  "PARK_TYPE": "State Park",
                  "GIS_ACRES": 390.45599365
                },
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    -91.57828320892212,
                    38.90688300130936
                  ]
                }
              },
              {
                "type": "Feature",
                "properties": {
                  "OBJECTID": 1038,
                  "LOC_NAME": "Grand Gulf State Park",
                  "PARK_ID": 9044,
                  "URL": "http://mostateparks.com/park/grand-gulf-state-park",
                  "SHORT_NAME": "Grand Gulf SP",
                  "REGION": "Ozark Region",
                  "PARK_TYPE": "State Park",
                  "GIS_ACRES": 314.03601074
                },
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    -91.64782090003834,
                    36.545892147907416
                  ]
                }
              },
              {
                "type": "Feature",
                "properties": {
                  "OBJECTID": 1039,
                  "LOC_NAME": "Iliniwek Village State Historic Site",
                  "PARK_ID": 4128,
                  "URL": "http://mostateparks.com/park/iliniwek-village-state-historic-site",
                  "SHORT_NAME": "Iliniwek Village SHS",
                  "REGION": "Northern Region",
                  "PARK_TYPE": "State Historic Site",
                  "GIS_ACRES": 120.59999847
                },
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    -91.55485954172049,
                    40.430644423272284
                  ]
                }
              },
              {
                "type": "Feature",
                "properties": {
                  "OBJECTID": 1040,
                  "LOC_NAME": "Roaring River State Park",
                  "PARK_ID": 4308,
                  "URL": "http://mostateparks.com/park/roaring-river-state-park",
                  "SHORT_NAME": "Roaring River SP",
                  "REGION": "Ozark Region",
                  "PARK_TYPE": "State Park",
                  "GIS_ACRES": 4136.6899414
                },
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    -93.8244219987445,
                    36.587888471448295
                  ]
                }
              },
              {
                "type": "Feature",
                "properties": {
                  "OBJECTID": 1041,
                  "LOC_NAME": "Thousand Hills State Park",
                  "PARK_ID": 4114,
                  "URL": "http://mostateparks.com/park/thousand-hills-state-park",
                  "SHORT_NAME": "Thousand Hills SP",
                  "REGION": "Northern Region",
                  "PARK_TYPE": "State Park",
                  "GIS_ACRES": 3002.94995117
                },
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    -92.64338300701712,
                    40.176502602778044
                  ]
                }
              },
              {
                "type": "Feature",
                "properties": {
                  "OBJECTID": 1042,
                  "LOC_NAME": "Towosahgy State Historic Site",
                  "PARK_ID": 4219,
                  "URL": "http://mostateparks.com/park/towosahgy-state-historic-site",
                  "SHORT_NAME": "Towosahgy SHS",
                  "REGION": "Eastern Region",
                  "PARK_TYPE": "State Historic Site",
                  "GIS_ACRES": 62.34439849
                },
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    -89.2352889845723,
                    36.69319370622155
                  ]
                }
              },
              {
                "type": "Feature",
                "properties": {
                  "OBJECTID": 1043,
                  "LOC_NAME": "Harry S Truman State Park",
                  "PARK_ID": 9006,
                  "URL": "http://mostateparks.com/park/harry-s-truman-state-park",
                  "SHORT_NAME": "Harry S Truman SP",
                  "REGION": "Ozark Region",
                  "PARK_TYPE": "State Park",
                  "GIS_ACRES": 1415.13000488
                },
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    -93.44477195316321,
                    38.28005933445348
                  ]
                }
              },
              {
                "type": "Feature",
                "properties": {
                  "OBJECTID": 1044,
                  "LOC_NAME": "Scott Joplin House State Historic Site",
                  "PARK_ID": 4227,
                  "URL": "http://mostateparks.com/park/scott-joplin-house-state-historic-site",
                  "SHORT_NAME": "Scott Joplin House SHS",
                  "REGION": "Eastern Region",
                  "PARK_TYPE": "State Historic Site",
                  "GIS_ACRES": 3.93774008
                },
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    -90.21546236800512,
                    38.63708694382501
                  ]
                }
              },
              {
                "type": "Feature",
                "properties": {
                  "OBJECTID": 1045,
                  "LOC_NAME": "Long Branch State Park",
                  "PARK_ID": 9003,
                  "URL": "http://mostateparks.com/park/long-branch-state-park",
                  "SHORT_NAME": "Long Branch SP",
                  "REGION": "Northern Region",
                  "PARK_TYPE": "State Park",
                  "GIS_ACRES": 1920.9399414
                },
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    -92.51353430667857,
                    39.7825545803779
                  ]
                }
              },
              {
                "type": "Feature",
                "properties": {
                  "OBJECTID": 1046,
                  "LOC_NAME": "Big Lake State Park",
                  "PARK_ID": 4104,
                  "URL": "http://mostateparks.com/park/big-lake-state-park",
                  "SHORT_NAME": "Big Lake SP",
                  "REGION": "Northern Region",
                  "PARK_TYPE": "State Park",
                  "GIS_ACRES": 399.29400634
                },
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    -95.36533778675715,
                    40.08307448441541
                  ]
                }
              },
              {
                "type": "Feature",
                "properties": {
                  "OBJECTID": 1047,
                  "LOC_NAME": "Lake Wappapello State Park",
                  "PARK_ID": 9009,
                  "URL": "http://mostateparks.com/park/lake-wappapello-state-park",
                  "SHORT_NAME": "Lake Wappapello SP",
                  "REGION": "Eastern Region",
                  "PARK_TYPE": "State Park",
                  "GIS_ACRES": 1921.77001953
                },
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    -90.33446413442836,
                    36.94314074985497
                  ]
                }
              },
              {
                "type": "Feature",
                "properties": {
                  "OBJECTID": 1048,
                  "LOC_NAME": "First Missouri State Capitol State Historic Site",
                  "PARK_ID": 4209,
                  "URL": "http://mostateparks.com/park/first-missouri-state-capitol-state-historic-site",
                  "SHORT_NAME": "First Mo State Capitol SHS",
                  "REGION": "Northern Region",
                  "PARK_TYPE": "State Historic Site",
                  "GIS_ACRES": 0.68295401
                },
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    -90.48150057598669,
                    38.78005481159141
                  ]
                }
              },
              {
                "type": "Feature",
                "properties": {
                  "OBJECTID": 1049,
                  "LOC_NAME": "Current River State Park",
                  "PARK_ID": 4233,
                  "URL": "http://mostateparks.com/park/current-river-state-park",
                  "SHORT_NAME": "Current River SP",
                  "REGION": "Ozark Region",
                  "PARK_TYPE": "State Park",
                  "GIS_ACRES": 846.75897216
                },
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    -91.43028818653502,
                    37.32480905174913
                  ]
                }
              },
              {
                "type": "Feature",
                "properties": {
                  "OBJECTID": 1050,
                  "LOC_NAME": "Montauk State Park",
                  "PARK_ID": 4306,
                  "URL": "http://mostateparks.com/park/montauk-state-park",
                  "SHORT_NAME": "Montauk SP",
                  "REGION": "Ozark Region",
                  "PARK_TYPE": "State Park",
                  "GIS_ACRES": 2127.23999023
                },
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    -91.67711298166148,
                    37.46125640981924
                  ]
                }
              },
              {
                "type": "Feature",
                "properties": {
                  "OBJECTID": 1051,
                  "LOC_NAME": "Felix Valle House State Historic Site",
                  "PARK_ID": 4224,
                  "URL": "http://mostateparks.com/park/felix-valle-house-state-historic-site",
                  "SHORT_NAME": "Felix Valle House SHS",
                  "REGION": "Eastern Region",
                  "PARK_TYPE": "State Historic Site",
                  "GIS_ACRES": 11.65050029
                },
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    -90.04173653948821,
                    37.97357569932574
                  ]
                }
              },
              {
                "type": "Feature",
                "properties": {
                  "OBJECTID": 1052,
                  "LOC_NAME": "Robertsville State Park",
                  "PARK_ID": 4225,
                  "URL": "http://mostateparks.com/park/robertsville-state-park",
                  "SHORT_NAME": "Robertsville SP",
                  "REGION": "Eastern Region",
                  "PARK_TYPE": "State Park",
                  "GIS_ACRES": 1231.34997558
                },
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    -90.81312529832101,
                    38.426618878003005
                  ]
                }
              },
              {
                "type": "Feature",
                "properties": {
                  "OBJECTID": 1053,
                  "LOC_NAME": "Locust Creek Covered Bridge State Historic Site",
                  "PARK_ID": 4121,
                  "URL": "http://mostateparks.com/park/locust-creek-covered-bridge-state-historic-site",
                  "SHORT_NAME": "Locust Creek Covered Bridge SHS",
                  "REGION": "Northern Region",
                  "PARK_TYPE": "State Historic Site",
                  "GIS_ACRES": 39.70090103
                },
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    -93.23267267336298,
                    39.78935186438994
                  ]
                }
              },
              {
                "type": "Feature",
                "properties": {
                  "OBJECTID": 1054,
                  "LOC_NAME": "Battle of Athens State Historic Site",
                  "PARK_ID": 4102,
                  "URL": "http://mostateparks.com/park/battle-athens-state-historic-site",
                  "SHORT_NAME": "Battle of Athens SHS",
                  "REGION": "Northern Region",
                  "PARK_TYPE": "State Historic Site",
                  "GIS_ACRES": 391.26400756
                },
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    -91.70806457664894,
                    40.58693998219204
                  ]
                }
              },
              {
                "type": "Feature",
                "properties": {
                  "OBJECTID": 1055,
                  "LOC_NAME": "Battle of Island Mound State Historic Site",
                  "PARK_ID": 4317,
                  "URL": "http://mostateparks.com/park/battle-island-mound-state-historic-site",
                  "SHORT_NAME": "Battle of Island Mound SHS",
                  "REGION": "Ozark Region",
                  "PARK_TYPE": "State Historic Site",
                  "GIS_ACRES": 38.73569869
                },
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    -94.43964462233018,
                    38.23514332720006
                  ]
                }
              },
              {
                "type": "Feature",
                "properties": {
                  "OBJECTID": 1056,
                  "LOC_NAME": "Don Robinson State Park",
                  "PARK_ID": 4234,
                  "URL": "http://mostateparks.com/park/don-robinson-state-park",
                  "SHORT_NAME": "Don Robinson SP",
                  "REGION": "Eastern Region",
                  "PARK_TYPE": "State Park",
                  "GIS_ACRES": 822.57202148
                },
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    -90.69321752813556,
                    38.394144971857884
                  ]
                }
              },
              {
                "type": "Feature",
                "properties": {
                  "OBJECTID": 1057,
                  "LOC_NAME": "Sappington Cemetery State Historic Site",
                  "PARK_ID": 4122,
                  "URL": "http://mostateparks.com/park/sappington-cemetery-state-historic-site",
                  "SHORT_NAME": "Sappington Cemetery SHS",
                  "REGION": "Northern Region",
                  "PARK_TYPE": "State Historic Site",
                  "GIS_ACRES": 2.83583998
                },
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    -93.00772600276136,
                    39.03304306157742
                  ]
                }
              },
              {
                "type": "Feature",
                "properties": {
                  "OBJECTID": 1058,
                  "LOC_NAME": "Echo Bluff State Park",
                  "PARK_ID": 4235,
                  "URL": "https://mostateparks.com/park/echo-bluff-state-park",
                  "SHORT_NAME": "Echo Bluff SP",
                  "REGION": "Ozark Region",
                  "PARK_TYPE": "State Park",
                  "GIS_ACRES": 452.70599365
                },
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    -91.40570853875161,
                    37.310074548863504
                  ]
                }
              },
              {
                "type": "Feature",
                "properties": {
                  "OBJECTID": 1059,
                  "LOC_NAME": "Taum Sauk Mountain State Park",
                  "PARK_ID": 4229,
                  "URL": "http://mostateparks.com/park/taum-sauk-mountain-state-park",
                  "SHORT_NAME": "Taum Sauk Mountain SP",
                  "REGION": "Eastern Region",
                  "PARK_TYPE": "State Park",
                  "GIS_ACRES": 9667.33984375
                },
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    -90.75764109194321,
                    37.557609914471165
                  ]
                }
              },
              {
                "type": "Feature",
                "properties": {
                  "OBJECTID": 1060,
                  "LOC_NAME": "Dr. Edmund A. Babler Memorial State Park",
                  "PARK_ID": 4201,
                  "URL": "https://mostateparks.com/park/dr-edmund-babler-memorial-state-park",
                  "SHORT_NAME": "Babler Memorial SP",
                  "REGION": "Eastern Region",
                  "PARK_TYPE": "State Park",
                  "GIS_ACRES": 2347.63989257
                },
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    -90.69497842115236,
                    38.62044268315628
                  ]
                }
              },
              {
                "type": "Feature",
                "properties": {
                  "OBJECTID": 1061,
                  "LOC_NAME": "Route 66 State Park",
                  "PARK_ID": 4230,
                  "URL": "https://mostateparks.com/park/route-66-state-park",
                  "SHORT_NAME": "Route 66",
                  "REGION": "Eastern Region",
                  "PARK_TYPE": "State Park",
                  "GIS_ACRES": 423.20800781
                },
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    -90.6029992576682,
                    38.508527954512914
                  ]
                }
              },
              {
                "type": "Feature",
                "properties": {
                  "OBJECTID": 1062,
                  "LOC_NAME": "Castlewood State Park",
                  "PARK_ID": 4205,
                  "URL": "https://mostateparks.com/park/castlewood-state-park",
                  "SHORT_NAME": "Castlewood SP",
                  "REGION": "Eastern Region",
                  "PARK_TYPE": "State Park",
                  "GIS_ACRES": 1768.70996093
                },
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    -90.56696308525459,
                    38.54016949874561
                  ]
                }
              },
              {
                "type": "Feature",
                "properties": {
                  "OBJECTID": 1063,
                  "LOC_NAME": "Bollinger Mill State Historic Site",
                  "PARK_ID": 4204,
                  "URL": "http://mostateparks.com/park/bollinger-mill-state-historic-site",
                  "SHORT_NAME": "Bollinger Mill SHS",
                  "REGION": "Eastern Region",
                  "PARK_TYPE": "State Historic Site",
                  "GIS_ACRES": 41.24470138
                },
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    -89.80397048159996,
                    37.36607326105377
                  ]
                }
              },
              {
                "type": "Feature",
                "properties": {
                  "OBJECTID": 1064,
                  "LOC_NAME": "Bryant Creek State Park",
                  "PARK_ID": 4320,
                  "URL": "https://mostateparks.com/park/bryant-creek-state-park",
                  "SHORT_NAME": "Bryant Creek SP",
                  "REGION": "Ozark Region",
                  "PARK_TYPE": "State Park",
                  "GIS_ACRES": 2958.68
                },
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    -92.42085877112461,
                    36.81856780303603
                  ]
                }
              },
              {
                "type": "Feature",
                "properties": {
                  "OBJECTID": 1065,
                  "LOC_NAME": "Shepherd of the Hills State Park",
                  "PARK_ID": 4319,
                  "URL": "https://mostateparks.com/park/ozark-mountain-state-park",
                  "SHORT_NAME": "Ozark Mountain SP",
                  "REGION": "Ozark Region",
                  "PARK_TYPE": "State Park",
                  "GIS_ACRES": 1021.96
                },
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    -93.29334535049837,
                    36.70149703402905
                  ]
                }
              },
              {
                "type": "Feature",
                "properties": {
                  "OBJECTID": 1066,
                  "LOC_NAME": "Jay Nixon State Park",
                  "PARK_ID": 4236,
                  "URL": "https://mostateparks.com/park/jay-nixon-state-park",
                  "SHORT_NAME": "Jay Nixon SP",
                  "REGION": "Eastern Region",
                  "PARK_TYPE": "State Park",
                  "GIS_ACRES": 1237
                },
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    -90.77774156014428,
                    37.58754180971751
                  ]
                }
              },
              {
                "type": "Feature",
                "properties": {
                  "OBJECTID": 1067,
                  "LOC_NAME": "Eleven Point State Park",
                  "PARK_ID": 4318,
                  "URL": "https://mostateparks.com/park/eleven-point-state-park",
                  "SHORT_NAME": "Eleven Point SP",
                  "REGION": "Ozark Region",
                  "PARK_TYPE": "State Park",
                  "GIS_ACRES": 4112
                },
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    -91.19091869618182,
                    36.600660386400016
                  ]
                }
              },
              {
                "type": "Feature",
                "properties": {
                  "OBJECTID": 1068,
                  "LOC_NAME": "Sappington African American Cemetery State Historic Site",
                  "PARK_ID": 4112,
                  "URL": "https://mostateparks.com/park/sappington-african-american-cemetery-state-historic-site",
                  "SHORT_NAME": "Sappington Cemetery SHS",
                  "REGION": "Northern Region",
                  "PARK_TYPE": "State Historic Site",
                  "GIS_ACRES": 2.25
                },
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    -93.01433768873248,
                    39.03248840487876
                  ]
                }
              }
            ]
          } 
        });
        map.addLayer({
        'id': 'airport',
        'source': 'airports',
        'type': 'circle',
        'paint': {
        'circle-color': '#4264fb',
        'circle-radius': 4,
        'circle-stroke-width': 2,
        'circle-stroke-color': '#ffffff'
        }
        });
         
        map.on('movestart', () => {
        // reset features filter as the map starts moving
        map.setFilter('airport', ['has', 'PARK_ID']);
        });
         
        map.on('moveend', () => {
        const features = map.queryRenderedFeatures({ layers: ['airport'] });
         
        if (features) {
        const uniqueFeatures = getUniqueFeatures(features, 'PARK_ID');
        // Populate features for the listing overlay.
        renderListings(uniqueFeatures);
         
        // Clear the input container
        filterEl.value = '';
         
        // Store the current features in sn `airports` variable to
        // later use for filtering on `keyup`.
        airports = uniqueFeatures;
        }
        });
         
        map.on('mousemove', 'airport', (e) => {
        // Change the cursor style as a UI indicator.
        map.getCanvas().style.cursor = 'pointer';
         
        // Populate the popup and set its coordinates based on the feature.
        const feature = e.features[0];
        popup
        .setLngLat(feature.geometry.coordinates)
        .setText(feature.properties.LOC_NAME)
        .addTo(map);
        });
         
        map.on('mouseleave', 'airport', () => {
        map.getCanvas().style.cursor = '';
        popup.remove();
        });
         
        filterEl.addEventListener('keypress', (e) => {
        const value = normalize(e.target.value);
         
        // Filter visible features that match the input value.
        const filtered = [];
        for (const feature of airports) {
        const name = normalize(feature.properties.LOC_NAME);
        const code = normalize(feature.properties.PARK_ID.toString());
        if (name.includes(value) || code.includes(value)) {
        filtered.push(feature);
        }
        }
         
        // Populate the sidebar with filtered results
        renderListings(filtered);
         
        // Set the filter to populate features into the layer.
        if (filtered.length) {
        map.setFilter('airport', [
        'match',
        ['get', 'PARK_ID'],
        filtered.map((feature) => {
        return feature.properties.PARK_ID;
        }),
        true,
        false
        ]);
        }
        });
         
        // Call this function on initialization
        // passing an empty array to render an empty state
        renderListings([]);
        });
 }, []);

 return (
    <div className='map-container'>
    
 
    <div className="map-overlay">
        <fieldset>
            <input id="feature-filter" type="text" placeholder="Filter results by name" />
        </fieldset>
        <div id="feature-listing" className="listing"></div>
    </div>
    <div id="map"></div>
    </div>
 )
 
}
export default FilterMap;