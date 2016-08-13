import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { actions as hackathonsActions } from '../../redux/modules/hackathons';
import classes from './HackathonsView.scss';
import ReactDOM from 'react-dom';
import moment from 'moment';

import {Button, Card, Content, Header, Column, Image, Reveal, Segment, Icon} from 'react-semantify';

type
Props = {
  hackathons: Object,
  selected: Object,
  listFromServer: Function,
  selectToServer: Function
};

export class HackathonsAsCardsComponent extends React.Component {

  static propTypes = {
    hackathons: PropTypes.object.isRequired,
    selected: PropTypes.object,
    listFromServer: PropTypes.func.isRequired,
    selectToServer: PropTypes.func.isRequired
  };

  componentWillMount() {
    this.props.listFromServer();
    this.getData();
  }

  getData() {
    this.setState({
    });
  }

  handleCreate() {
    window.location = '#/hackathons/create/new/';
  }

  render() {
    var selectFunction = this.props.selectToServer;
    if(!this.props.hackathons || !this.props.hackathons.hackathons) {
      return (<div>Loadingo</div>)
    }

    var cards = this.props.hackathons.hackathons
    .map(function (card) {

      var handleSelect = function(hackathon) {
        selectFunction(hackathon);
        //window.location = '#/';
        //window.location = '/';
      }

      return (
        <Column key={card._id}>
          <Card className="fluid">
            <a onClick={handleSelect.bind(this, card)}>
              <Reveal className="fade">
                <Content className="hidden">
                  <Image type="link" src={'user-images/' + card.pictureURL} className={classes['brighter']}/>
                </Content>
                <Content className="visible">
                  <Image src={'user-images/' + card.pictureURL}
                          className={ !card.active ? classes['backnwhite'] : classes['none'] } />
                </Content>
              </Reveal>
            </a>

            <Content>
              <a onClick={handleSelect.bind(this, card)}>
                <Header className="center aligned">
                    {card.title}
                </Header>
              </a>
              <div className="center aligned">
                <p className="">
                  {card.shortDescription}
                </p>
              </div>
              <div className="ui description center aligned">
                { (moment(card.startDate).month() !== moment(card.endDate).month() ?
                  moment(card.startDate).format('Do MMM YY') :
                    moment(card.startDate).format('Do'))
                    + " - "
                    + moment(card.endDate).format('Do MMM YY')
                }
              </div>
            </Content>
            <div className="extra center aligned">
              <a href={'#/hackathons/' + card._id}>
                  Details
              </a>
            </div>
          </Card>
        </Column>
      );
    });

    return(
      <div className="ui container">
        <Segment className="basic stackable one column grid">
          <Button className={!this.props.user || !this.props.user.user || this.props.user.user.judge !== true ? 'hide-it' : "column right floated"}
                  color="blue" onClick={this.handleCreate} >
            <Icon className="plus"/> Create Hackathon
          </Button>
        </Segment>
        <Segment loading={!this.props.hackathons} className="ui stackable three column grid basic">
          <h2 className={this.props.hackathons.hackathons.length === 0 ? "" : "hide-it"}>
            There is no hackathon yet!
          </h2>
          {cards}
        </Segment>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  hackathons: state.hackathons,
  user: state.user,
  selected: state.selected,
  selectToServer: state.selectToServer
});
export default connect(mapStateToProps, hackathonsActions)(HackathonsAsCardsComponent);
