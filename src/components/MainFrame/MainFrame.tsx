import React, { Component } from 'react'
import * as SDK from "azure-devops-extension-sdk"
import { ObservableValue } from "azure-devops-ui/Core/Observable";

import "@/components/MainFrame/MainFrame.scss"
import { showRootComponent } from "@/Common"

class MainFrame extends Component<{}, { }> {
    private isDialogOpen = new ObservableValue<boolean>(false);

    constructor(props: {}) {
        super(props)
        this.state = {

        }
    }

    public componentDidMount() {
        SDK.init()
        .then( () => {
            SDK.register(SDK.getContributionId(), () => {
                return {
                    
                }
            })
        })

        SDK.ready().then(
            () => {
                SDK.notifyLoadSucceeded()
                SDK.resize()
            }
        )
    }

    public render(): JSX.Element {
        const onDismiss = () => {
            this.isDialogOpen.value = false;
        };
        return (
            <div className='container'>
                <h1>Hola</h1>
            </div>
        )
    }
}

export default MainFrame
showRootComponent(<MainFrame />)