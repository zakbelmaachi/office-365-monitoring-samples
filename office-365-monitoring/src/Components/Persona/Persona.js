import * as React from 'react';
import {
  Persona,
  PersonaSize,
  PersonaPresence
} from 'office-ui-fabric-react/lib/Persona';
import './Persona.css';

const examplePersona = {
  imageUrl: '',
  imageInitials: 'AL',
  primaryText: 'Annie Lindqvist',
  secondaryText: 'Software Engineer',
  tertiaryText: 'In a meeting',
  optionalText: 'Available at 4:00pm'
};

export class PersonaBasicExample extends React.Component {
  constructor() {
    super();
    this.state = {  
      renderPersonaDetails: false 
    };
  }

  render() {
    const { renderPersonaDetails } = this.state;

    return (
      <div>
        <Persona
          { ...examplePersona }
          size={ PersonaSize.regular }
          hidePersonaDetails={ !renderPersonaDetails }
          className="float-right"
        />
      </div>
    );
  }
}

export default PersonaBasicExample;