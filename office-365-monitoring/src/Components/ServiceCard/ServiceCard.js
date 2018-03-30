import React from 'react'
import { Card, Icon } from 'semantic-ui-react'
import './ServiceCard.css';

const ServiceCard = (props) => (
  <Card>
    <Card.Content className="card-content">
      <Card.Header>
        {props.header}
      </Card.Header>
      <Card.Meta>
        <span className='date'>
        {props.statusDisplayName}
        </span>
      </Card.Meta>
    </Card.Content>
    <Card.Content extra style={props.backgroundColor} className="card-content-extra">
      <a>
        <Icon name='alarm' />
        {props.indicedents}
      </a>
    </Card.Content>
  </Card>
)

export default ServiceCard