import { withGoogleMap, 
        GoogleMap,
        Marker  ,
        InfoWindow,
        Polyline}
       from "react-google-maps";
import React  from 'react'
import { Icon 
        } from 'semantic-ui-react'

let busIcon  =  require("../img/busIcon16.png"); 


const googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCrh7hmZzXTo-iIN2fAwcC-APtH1_RMNi8"

//  thailand region
const region =  {
    lat: 15.870032,
    longitudeDelta: 10.0,
    name: 'Thailand',
    lng: 100.992541,
    latitudeDelta: 10.0,
  }



const Map = withGoogleMap(props => (
  <GoogleMap
    zoom={props.zoomLevel}
    center={{...props.region}}
    >
     <Polyline
       options={{  strokeColor: '#20AC8F' , strokeWeight: 5 }}
       path={props.busRoute}
     />
     {  props.startPoint ?  
      <Marker
          icon={{ url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'  }}
          position={{...props.startPoint}}  
        >
           <InfoWindow >
            <div>
            <Icon name='marker' color='green' />
               {'จุดเริ่มต้น'}</div>
          </InfoWindow>

        </Marker> 
      : null
     }

     {  
       props.endPoint ?
       <Marker position={{...props.endPoint}} >
        <InfoWindow >
            <div>
            <Icon name='marker' color='red' />
               {'จุดสิ้นสุด'}</div>
          </InfoWindow>
       </Marker>
       : null

     }

     { (props.busStopMarker.length > 0 &&   props.isShowBusStopMarker ) ? 
         props.busStopMarker.map( (busStop) => (
        <Marker key={busStop.id}   
        defaultAnimation= {2}
        icon={{url:busIcon}}
        position={{...busStop}} 
        onClick={(e) => props.onClickMarker(busStop) }

        >
       
       
       { busStop.showInfo && 
        ( <InfoWindow 
           >
            <div>
            <Icon name='bus' color='blue' />
            {busStop.busStopNameTh}</div>
          </InfoWindow>)
       }
        
      </Marker>
        )
     ) : null
    }

  </GoogleMap>

));

export default Map;