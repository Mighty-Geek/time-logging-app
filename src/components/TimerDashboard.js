import React, { Component } from 'react';
import EditableTimerList from './EditableTimerList';
import ToggleableTimerForm from './ToggleableTimerForm';
import { Header, Segment } from 'semantic-ui-react'

export default class TimersDashboard extends Component {
    render() {
        return (
            <>
                <Segment inverted>
                    <Header size='huge' inverted color='blue' textAlign='center'>
                        Timers
                    </Header>
                </Segment>
                <div className='ui three column centered grid'>
                    <div className='column'>
                        <EditableTimerList />
                        <ToggleableTimerForm
                            isOpen={true}
                        />
                    </div>
                </div>
            </>
        );
    }
}