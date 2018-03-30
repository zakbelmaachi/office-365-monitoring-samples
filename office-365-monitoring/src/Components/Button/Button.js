import * as React from 'react';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Label } from 'office-ui-fabric-react/lib/Label';
import './Button.css';
import '../../../node_modules/office-ui-fabric-core/dist/css/fabric.min.css';

const Button = (props) => (
    <Fabric className="button-spacing">
        <DefaultButton
            primary={true}
            data-automation-id='test'
            text={ props.action }
            onClick={ props.handleClick }
            checked={ props.checked }
        />
    </Fabric>
);

export default Button;
