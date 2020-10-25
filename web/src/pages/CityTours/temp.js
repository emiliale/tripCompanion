import React from "react";
import { Typography, Row, Col, Button, Layout, Card, Divider } from "antd";
import { Link } from "react-router-dom";
import axios from 'axios';
import mapboxgl from 'mapbox-gl';
import style from "./map.css"
import { Marker } from "react-map-gl";
import ReactMapboxGl, { MapContext } from "react-mapbox-gl";
import PlaceAutocompleteComponent from "./PlaceAutocompleteComponent"
import * as turf from '@turf/helpers'
import { getKeyThenIncreaseKey } from "antd/lib/message";

const { Header, Content, Footer } = Layout;

const { Title, Paragraph } = Typography;
const mapStyles = {
    //position: "absolute",
    width: "100%",
    height: "90%",
};

mapboxgl.accessToken = 'pk.eyJ1IjoiZW5lbWlsYSIsImEiOiJja2diMXZscDEwMmkzMnlwOHY4MDE4cG12In0.8beJYbEq_SkImugp6WejTA'


class Test extends React.Component {
    state = {
        lng: 17.0369,
        lat: 51.1075,
        zoom: 14,
        geojson: {},
        uploaded: false,
        openMap: false,
        popUp: true,
        image: {},
        name: "",
        description: "",
        placeCoordinates: [],
        routePlaces: [],
        routeJson: {},

        map: {},
        done: false,
    };

    componentDidUpdate(prevProps, prevState) {

        if (!this.state.uploaded && this.state.openMap) {
            this.getAttractions()
        }
        if (this.state.geojson !== prevState && !this.state.uploaded && this.state.openMap) {
            this.setState({ uploaded: true })
            let mapVar = new mapboxgl.Map({
                container: this.mapContainer,
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [this.state.lng, this.state.lat],
                zoom: this.state.zoom,
            });
            this.setState({map: mapVar})

        }

        if (this.state.map !== prevState && this.state.uploaded &&!this.state.done) {        
            this.setState({ done: true })

            this.state.map.on('load', () => {
                this.state.map.loadImage(
                    'https://img.icons8.com/color/48/000000/marker.png',
                    (error, image) => {
                        if (error) throw error;
                        this.state.map.addImage('marker', image);
                        this.state.map.addSource("places", {
                            type: "geojson",
                            data: this.state.geojson,
                        });
                        this.state.map.addLayer({
                            'id': 'places',
                            'type': 'symbol',
                            'source': 'places',
                            'layout': {
                                'icon-image': 'marker',
                                'icon-size': 0.45
                            }
                        });
                    }
                );
            });

            this.state.map.on('click', 'places', e => {
                this.getDescription(e.features[0].properties.xid)
                // this.state.map.getSource('route')
                //     .setData(this.getRoute());
            });

            
            this.state.map.on('mouseenter', 'places', ()  => {
                this.state.map.getCanvas().style.cursor = 'pointer';
            });

            this.state.map.on('mouseleave', 'places', ()  =>  {
                this.state.map.getCanvas().style.cursor = '';
            });

            this.state.map.on('move', () => {
                this.setState({
                    lng: this.state.map.getCenter().lng.toFixed(4),
                    lat: this.state.map.getCenter().lat.toFixed(4),
                    zoom: this.state.map.getZoom().toFixed(2)
                });
            });

            let nothing = turf.featureCollection([]);


            this.state.map.on('load', () => {
                this.state.map.addSource('route', {
                    type: 'geojson',
                    data: nothing,
                  });
                  
                  this.state.map.addLayer({
                    id: 'routeline-active',
                    type: 'line',
                    source: 'route',
                    layout: {
                      'line-join': 'round',
                      'line-cap': 'round'
                    },
                    paint: {
                      'line-color': '#3887be',
                      'line-width': [
                        "interpolate",
                        ["linear"],
                        ["zoom"],
                        12, 3,
                        22, 12
                      ]
                    }
                  }, 'waterway-label');
            });    


        }
    }

    getDescription = (xid) => {
        axios.get(
            `https://api.opentripmap.com/0.1/en/places/xid/${xid}?apikey=5ae2e3f221c38a28845f05b66dd041008f502f976c4cd76d927351d3`)
            .then((res) => {
                this.setState({
                    image: res.data.preview.source, 
                    name: res.data.name, 
                    description: res.data.wikipedia_extracts.text, 
                    placeCoordinates: [res.data.point.lon, res.data.point.lat]})
            })
            .catch((err) => {
                console.log(err)
            });
    }

    getAttractions = () => {
        axios.get(
            `https://api.opentripmap.com/0.1/en/places/radius?radius=3000&lon=${this.state.lng}&lat=${this.state.lat}&src_attr=osm&kinds=cultural%2Carchitecture&rate=3&format=geojson&limit=50000&apikey=5ae2e3f221c38a28845f05b66dd041008f502f976c4cd76d927351d3`)
            .then((res) => {
                this.setState({ geojson: res.data })
            })
            .catch((err) => {
                console.log(err)
            });
    };


    setCoordinates = (lat, lng) => {
        this.setState({ lat: lat, lng: lng, uploaded: false })
    }

    openMap = () => {
        this.setState({ openMap: true })
    }

    getRoute = (newCoords) => {
        let coords = ""
        this.state.routePlaces.length > 0 
        ? coords = this.state.routePlaces.join(";") + ";" + newCoords
        : coords = this.state.routePlaces + newCoords
        console.log(coords)
        let routeGeoJSON = turf.featureCollection();
        axios.get(
            `https://api.mapbox.com/optimized-trips/v1/mapbox/walking/${coords}?geometries=geojson&access_token=pk.eyJ1IjoiZW5lbWlsYSIsImEiOiJja2diMXZscDEwMmkzMnlwOHY4MDE4cG12In0.8beJYbEq_SkImugp6WejTA`)
            .then((res) => {
                routeGeoJSON = turf.featureCollection([turf.feature(res.data.trips[0].geometry)]);
                this.setState({ routeJson: routeGeoJSON })
                this.state.map.getSource('route')
                     .setData(routeGeoJSON);
            })
            .catch((err) => {
                console.log(err)
            });
    };

    addToRoute = () => {
        let coords = this.state.placeCoordinates.join([","])
        this.setState((prevState) => {
            let newRoutePlaces =  prevState.routePlaces
            newRoutePlaces.push(coords)
            return {routePlaces: newRoutePlaces}
        })
        this.getRoute(coords)
    }
    

    render() {
        return (
            <div style={{ paddingRight: "5%", paddingLeft: "5%" }} style={mapStyles} >
                <PlaceAutocompleteComponent
                    setCoordinates={(lat, lng) => this.setCoordinates(lat, lng)}
                    openMap={() => this.openMap()} />
                <Row>
                    <Col span={14}>
                        {this.state.openMap ? (
                            <div>Longitude: {this.state.lng} | Latitude: {this.state.lat} | Zoom: {this.state.zoom}
                                <Content style={{ padding: '0 50px', height: "800px" }}>
                                    <div ref={el => this.mapContainer = el} className="mapContainer" style={mapStyles} />
                                </Content>
                            </div>
                        ) : null}
                    </Col>
                    <Col span={10}>
                    {this.state.name ? (
                            <div>
                                <Card
                                    title={this.state.name}
                                    style={{ width: 300 }}
                                    cover={
                                        <img
                                            alt="example"
                                            src={this.state.image}
                                        />
                                    }
                                >
                                </Card>
                                <p>{this.state.description}</p>
                                <Button
                                onClick={() => this.addToRoute()}
                                
                                >Add</Button>
                            </div>
                    ) :null }
                    </Col>
                </Row>
            </div >
        );
    }
}

export default Test;