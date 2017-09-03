import React from 'react';
import {
    Grid, Image, Header, Icon, Label,Popup,
    Menu, Search, Button, Segment, Input
} from 'semantic-ui-react'

import { slide as MenuSearchSlide } from 'react-burger-menu'
import { slide as MenuBusStopSlide } from 'react-burger-menu'


import _ from 'lodash'
//let logo = require('../img/busLogo.png');
let logo = require('../img/businfo_icon.png');
class MainHeader extends React.Component {

    _showBusBtn = 0.0;
    _showMarker =  false;

    constructor(props) {
        super(props);
        this.state = {
            searchText: "",
            selectBusItem: null,
            isSearchMenuOpen: false,
            isBusStopMenuOpen: false,
            busList: [],
            isInboundActive: true,
            directionType: 'ขาเข้า',
            busDirection: []
        }

        this.onClickSearch = this.onClickSearch.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
        this.onChangeDirection = this.onChangeDirection.bind(this);
        this.onClickBusStop = this.onClickBusStop.bind(this);
        this.showBusInfo = this.showBusInfo.bind(this);
    } //  end  constructor


    // componentDidMount() {

    //     //console.log(this.props.busData);
    //     this.setState({ busList: this.props.busData });

    // }

    showBusNameText() {

        if (this.props.selectBusItem) {
            return (


                <Header as='h2'
                    style={{ marginLeft: "5px", marginTop: "4px" }}
                >

                    <Label
                        circular color={'blue'}
                        size={'huge'}
                        style={{ marginTop: "3px" }}
                    >
                        {this.props.selectBusItem.busNo}</Label>
                    <Header.Content>
                        {this.props.selectBusItem.busNameTh}
                        <Header.Subheader>
                            {this.props.selectBusItem.busOwnerTh} ประเภทรถ : {this.props.selectBusItem.busTypeTh + " "}
                            เวลาให้บริการ  :  {this.props.selectBusItem.busServiceTime}

                        </Header.Subheader>


                    </Header.Content>


                </Header>
            )
        } else {

        }


    }




    onClickSearch() {


        this.setState({ 
            isSearchMenuOpen: true ,
            isBusStopMenuOpen : false
        });

    }

    onClickMenu(selectBusItem) {

        this.props.onClickLink(selectBusItem, true);
        this._showBusBtn = "1.0";
    }

    onChangeText(event) {
        this.setState({ searchText: event.target.value });
    }


    onChangeDirection(direction) {

        this.props.onChangeDirection(direction);

        let isInboundActive = true;
        let directionType = 'ขาเข้า';
        if (direction == 'outbound') {
            isInboundActive = false;
            directionType = 'ขาออก';
        }
        this.setState({
            isInboundActive: isInboundActive,
             directionType : directionType
        });

    }

    onClickBusStop(){

    this.setState({ 
                    isBusStopMenuOpen: true ,
                    isSearchMenuOpen : false
                })
    this.props.onClickBusStop();

    }

    showBusInfo(busStop){
      this.props.onClickMarker(busStop); 
    }

    renderBusList() {

        let { busData } = this.props;
        let { searchText } = this.state;


        if (this.state.searchText == "") {
            return (
                busData.map((bus) => (
                    <a key={bus.id}
                        onClick={(e) => this.onClickMenu(bus)}  >
                        <Label
                            circular color={'pink'}
                            size={'medium'}
                        >
                            {bus.busNo}
                        </Label>
                        {""}  {bus.busNameTh} {""}  {"("+bus.busOwnerTh+")"} </a>
                ))
            )
        } else {

            let busSearchResult = [];
            for (var i = 0; i < busData.length; i++) {
                if (busData[i].keyword.includes(searchText))
                    busSearchResult.push(busData[i]);
            }

            return (
                busSearchResult.map((bus) => (
                    <a key={bus.id}
                        onClick={(e) => this.onClickMenu(bus)}  >

                        <Label
                            circular color={'pink'}
                            size={'medium'}
                        >
                            {bus.busNo}
                        </Label>

                        {""} {bus.busNameTh} {""} {"("+bus.busOwnerTh+")"}  </a>
                ))
            )
        }

    }

    renderBusStopList() {

        let { busStopMarker } = this.props;
        return (
            <MenuBusStopSlide
                right={true}
                noOverlay={true}
                burgerButtonClassName={"search-menu-slide-btn"}
                isOpen={this.state.isBusStopMenuOpen}
            >

                <a className="close-slide-btn"
                    style={{ fontSize: '16px', textAlign: "right", position: "absolute", backgroundColor: "#373A47", width: "100%" }}
                >

                <Icon
                        onClick={() => this.setState({ isBusStopMenuOpen: false })}
                        size={'large'}
                        name='close' />
                 <div style={{ textAlign:"center" ,fontSize:'1.2em' ,marginTop:"-15px"  }} >
                        {'ป้ายที่วิ่งผ่าน'} {''} {'('+this.state.directionType+')'}
                        
                        </div>
                </a>


                <a style={{ textAlign: "center" }}> </a>
                <a style={{ textAlign: "right" }}></a>

                {busStopMarker.map((busStop) => (
                    <a key={busStop.id}
                    onClick={(e) => this.showBusInfo(busStop)} 
                    >
                        <Icon name="bus"
                            color="blue"
                        />
                        {busStop.busStopNameTh}
                    </a>
                ))
                }
            </MenuBusStopSlide>
        )


    }

    render() {
        let props = this.props;
        return (

            <Header size='huge'
                style={{ height: "55px" }}
            >
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={5}>

                            <Header as='h2'
                                style={{ marginLeft: "5px" }}
                            >
                                <Image src={logo}
                                style={{ width:"3.5em" }}
                         
                                />
                                <Header.Content>
                                    Bangkok bus info
                    <Header.Subheader>
                                  search bus transit
                    </Header.Subheader>
                                </Header.Content>
                            </Header>



                        </Grid.Column>


                        <Grid.Column width={8} 
                        style={{ padding:"0px"  }}
                        >


                            {this.showBusNameText()}


                        </Grid.Column>

                        <Grid.Column width={3} 
                        style={{ paddingLeft:"0px"  }}
                        >

  

                         <Popup
                                position={'bottom center'}
                                trigger={
                                    <Button icon
                                        style={topBtnStyle}
                                        onClick={this.onClickSearch}
                                        color={'orange'}
                                    >
                                        <Icon name='search'
                                        />
                                    </Button>

                                }
                                content='ค้นหา'
                            />

                            
                            <Popup
                                position={'bottom center'}
                                trigger={

                                    <Button icon
                                        style={{ float: "right", marginTop: "11px", opacity: this._showBusBtn }}
                                        onClick={() => { this.onClickBusStop() }}
                                        color={'blue'}
                                    >
                                        <Icon name='bus' />
                                    </Button>

                                }
                                content='ป้ายรถเมล์'
                            />
                            




                          <Popup
                                position={'right center'}
                                trigger={
                                <Button icon
                                  style={{ float: "right", marginTop: "11px", opacity: this._showBusBtn }}
                                    color={this.state.isInboundActive ? 'red' : 'green'}
                                    onClick={() => this.onChangeDirection('outbound')}
                                >
                                    <Icon name='arrow right' />
                                </Button>

                                }
                                content='ขาออก'
                            />

                            <Popup
                                position={'right center'}
                                trigger={
                                    <Button icon
                                      style={{ float: "right", marginTop: "11px", opacity: this._showBusBtn }}
                                        color={this.state.isInboundActive ? 'green' : 'red'}
                                        onClick={() => this.onChangeDirection('inbound')}
                                    >
                                        <Icon name='arrow left' />

                                    </Button>

                                }
                                content='ขาเข้า'
                            />


                           







                        </Grid.Column>



                    </Grid.Row>
                </Grid>

                <MenuSearchSlide
                    right={true}
                    bodyClassName={"search-menu-body"}
                    noOverlay={true}
                    burgerButtonClassName={"search-menu-slide-btn"}
                    customCrossIcon={false}
                    isOpen={this.state.isSearchMenuOpen}
                    menuClassName={'search-menu-slide'}
                >

                    <a className="close-slide-btn"
                        style={{ fontSize: '16px', textAlign: "right", position: "absolute", backgroundColor: "#373A47", width: "100%" }}
                    >
                        <Icon
                            onClick={() => this.setState({ isSearchMenuOpen: false })}
                            size={'large'}
                            name='close' />
                        <Input
                            icon={{ name: 'search', circular: true, link: true }}
                            onChange={this.onChangeText}
                        />

                    </a>

                    <a style={{ textAlign: "right" }}  >
                    </a>
                    <a style={{ textAlign: "right" }}  >
                    </a>



                    {this.renderBusList()}

                </MenuSearchSlide>


                {this.renderBusStopList()}


            </Header>



        )
    }
}



const topBtnStyle = {
    float: "right",
    marginTop: "11px",
    marginRight: "2px"
}

export default MainHeader;
