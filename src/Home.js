import React from 'react'
import { Container,
         Header,
         Icon ,
         Grid ,
         Divider ,
         Segment ,
         Image
        } from 'semantic-ui-react'

import Map from './component/Map';

import MainHeader from './component/MainHeader';

 
//  thailand region
const REGION =  {
    lat: 15.870032,
    longitudeDelta: 10.0,
    name: 'Thailand',
    lng: 100.992541,
    latitudeDelta: 10.0,
  }

const token = 'VUd4e3VXQiWHVUCLqr1RFE4u84vVlm21FexctSDlCJeRj5GJa15BnAdZZ0oCPYx';

//const  SERVER_NAME = 'https://bkk-bus-map-server.herokuapp.com' ;
const  SERVER_NAME = 'https://bkk-bus-api.appspot.com';
//const SERVER_NAME = 'http://localhost:4001'


class Home extends React.Component {

    isMenuClosed = false;

    constructor(props) {
        super(props)
        this.state = {
            text: "test",
            zoomLevel: 6,
            busData: [],
            busRoute:[],
            region : REGION,
            startPoint : null,
            endPoint: null ,
            busStopInbound: [],
            busStopOutbound:[],
            busStopMarker : [],
            isMenuOpen : false,
            selectBusItem : null,
            isSearchMenuOpen : false,
            isShowBusStopMarker : false
        
        };

     this.onClickLink = this.onClickLink.bind(this);
     this.onCloseMenu = this.onCloseMenu.bind(this);
     this.onChangeDirection = this.onChangeDirection.bind(this);
     this.onClickMarker  =  this.onClickMarker.bind(this);
     this.onClickBusStop =  this.onClickBusStop.bind(this);
    }


    fetchData(url) {

        return fetch(url, {
            headers: {
                'Authorization': token
            }
        }
        ).then(function (response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        });
    }

    componentDidMount() {

        //var url = '/busData'
        let url =  SERVER_NAME+"/busData";
        let self = this;

     this.fetchData(url)
           .then(function (data) {
                let result = Object.keys(data).map(function (k) { return data[k] });
               result.map( (bus)=> {
                     bus.keyword = bus.busNo+" "+bus.busNameTh; 
                     return  bus;
                })
                self.setState({ busData: result });
            });
    }




    onClickLink(selectBusItem) {
       this.getBusRoute(selectBusItem) ;
   
    }

    onCloseMenu(){
        this.setState({isMenuOpen : false});
    }


    onClickBusStop(){
        this.setState({ isShowBusStopMarker : true })
    }

    getBusRoute(selectBusItem ,direction ='inbound' ){
       // todo get bus route information.
      let  url = SERVER_NAME+'/busRoute/'+selectBusItem.id ;
      let self  = this;


      this.fetchData(url)
            .then(function (data) {

            let { busRoute ,inbound , outbound , busStopInbound , busStopOutbound  } = data;
     

                let inboundData = objToArray(inbound);
                   inboundData  = inboundData.map(item => { return { lat: item.latitude, lng: item.longitude } });

                let outboundData = objToArray(outbound);
                     outboundData   =  outboundData.map(item => { return { lat: item.latitude, lng: item.longitude } });

 
                 let result  =  objToArray(busRoute); 
                let directionLine =  inboundData;

                if(direction== "outbound")
                directionLine =  outboundData;

        
                 busStopInbound  =  objToArray(busStopInbound); 
                 busStopOutbound =  objToArray(busStopOutbound);

                 busStopInbound = busStopInbound.map(item => {
                     item.lat = item.latitude;
                     item.lng = item.longitude;
                     item.showInfo = false;
                     return item;
                 });


                    busStopOutbound = busStopOutbound.map(item => {
                     item.lat = item.latitude;
                     item.lng = item.longitude;
                     item.showInfo = false;
                     return item;
                 });


                 let  startPoint = directionLine[0];
                 let  endPoint =  directionLine[directionLine.length-1];

            

                self.setState({
                     selectBusItem : selectBusItem,
                     busRoute   :  directionLine ,
                     region     : startPoint,
                     startPoint : startPoint,
                     zoomLevel  : 12,
                     endPoint   : endPoint,
                     busStopInbound : busStopInbound,
                     busStopOutbound : busStopOutbound ,
                     busStopMarker : busStopInbound,
                     inbound : inboundData,
                     outbound : outboundData
                    });
            });
    }


    onChangeDirection(direction){

        let busRoute = this.state.inbound;
        let busStopMarker = this.state.busStopInbound; 
       
        if(direction == 'outbound'){
            busRoute =  this.state.outbound;
            busStopMarker = this.state.busStopOutbound;
        }

         let  startPoint = busRoute[0];
         let  endPoint = busRoute[busRoute.length-1];

            this.setState({ 
                busRoute:  busRoute ,
                busStopMarker : busStopMarker,
                region : startPoint,
                startPoint :  startPoint ,
                zoomLevel  : 12,
               endPoint   :  endPoint
            })
        


    }
    
    onClickMarker(targetMarker){
    
       // e.preventDefault();
         //console.log("click marker" , targetMarker);

        this.setState({
            busStopMarker: this.state.busStopMarker.map(marker => {
                if (marker === targetMarker) {
                    return {
                        ...marker,
                        showInfo: true,
                    };
                }
                return marker;
            }),
           region : { lat : targetMarker.lat  , lng : targetMarker.lng }
        });


    }

    render() {
        return (<div>
          
            <MainHeader  {...this.state} 
                     onClickLink={this.onClickLink} 
                     onCloseMenu={this.onCloseMenu} 
                     getBusRoute={this.getBusRoute}
                     onChangeDirection={this.onChangeDirection}
                     onClickBusStop ={this.onClickBusStop}
                     onClickMarker ={this.onClickMarker}
                     
                     />

            <Container fluid>




                <Map
                    zoomLevel = {this.state.zoomLevel}
                    region = {this.state.region}
                    startPoint ={this.state.startPoint}
                    endPoint = {this.state.endPoint}
                    busRoute={this.state.busRoute}
                    busStopMarker={ this.state.busStopMarker }
                    onClickMarker={this.onClickMarker}
                    isShowBusStopMarker={this.state.isShowBusStopMarker}
                    containerElement={
                        <div  className='map-container' />
                    }
                    mapElement={
                        <div style={{ height: '100%', width: '100%' }} />
                    }
                >
             
            </Map>


            </Container>
            
            <div id='footer'>
                <a href="https://play.google.com/store/apps/details?id=com.bkkbusinfo" >
                    <img id='google_play_img' src='Google_play.png' />
               </a>
            </div>

 

        </div>);
    }
}


const objToArray  =  function(obj){
        return Object.keys(obj).map(function (key) { return obj[key] });
    }



export default Home