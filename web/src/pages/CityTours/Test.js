import React from "react";
import { Typography, Row, Col, Button, Layout } from "antd";
import { Link } from "react-router-dom";
import axios from 'axios';
import mapboxgl from 'mapbox-gl';
//import style from "./map.css"
import { Marker } from "react-map-gl";



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
        lng: 5,
        lat: 34,
        zoom: 2,
    };

    componentDidMount() {

        // const map = new mapboxgl.Map({
        //     container: this.mapContainer,
        //     style: 'mapbox://styles/mapbox/streets-v11',
        //     center: [this.state.lng, this.state.lat],
        //     zoom: this.state.zoom
        // });

        // map.on('load', function () {
        //     map.addSource('points', {
        //         'type': 'vector',
        //         'tiles': [
        //             'https://api.opentripmap.com/0.1/en/tiles/heat/10/5/5.pbf?kinds=interesting_places&rate=1&apikey=5ae2e3f221c38a28845f05b66dd041008f502f976c4cd76d927351d3',
        //         ],
        //         'maxzoom': 14
        //     })
        //     map.addLayer({
        //         'id': 'data-points',
        //         'type': 'heatmap',
        //         'source': 'points',
        //         'source-layer': 'heat',
        //     });
        // })

        // map.on('move', () => {
        //     this.setState({
        //         lng: map.getCenter().lng.toFixed(4),
        //         lat: map.getCenter().lat.toFixed(4),
        //         zoom: map.getZoom().toFixed(2)
        //     });
        // });

        let map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [12.550343, 55.665957],
            zoom: 8
        });

        var marker = new mapboxgl.Marker()
            .setLngLat([12.550343, 55.665957])
            .addTo(map);
    }

    render() {
        return (
            <div style={{ paddingRight: "5%", paddingLeft: "5%" }} style={mapStyles} >
                <div>Longitude: {this.state.lng} | Latitude: {this.state.lat} | Zoom: {this.state.zoom}</div>
                <Content style={{ padding: '0 50px', height: "1000px" }}>
                    <div ref={el => this.mapContainer = el} className="mapContainer" style={mapStyles} />
                </Content>

            </div >
        );
    }
}

export default Test;
