import React from 'react';
import {  Marker ,  InfoWindow } from "react-google-maps";
let busIcon  =  require("../img/busIcon16.png");

export  default  class  MarkerInfo extends React.Component{

    _showInfo = true;
  constructor(props){
           super(props)
           this.state={
               showInfo : false
           }
       } //  end  constructor


render(){
    return(
        
            <Marker   
                defaultAnimation= {2}
                icon={{url:busIcon}}
                position={{...this.props.busStop}} 
                onClick={() => this._showInfo = true}
                >
              {(<InfoWindow>{ this.props.busStop.busNameTh }</InfoWindow>  )  }
            </Marker>

        
        
    )    
} 

} //  end class