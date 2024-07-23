


import React, { ButtonHTMLAttributes } from 'react';
import "./TripleSelectActionButton.css"
import hours from '../assets/timer-icon-hours.png'
import minutes from '../assets/timer-icon-minutes.png'
import seconds from '../assets/timer-icon-seconds.png'


type TripleSelectActionButton = {

}

type ActionButton = {

} & ButtonHTMLAttributes<HTMLButtonElement>

const  TripleSelectActionButton = () => {

        return <div className="circle-outer">
                                <div className="circle">
                                    <button onClick={console.log}>
                                        <div className="content first">
                                            <img alt={'edit'} src={seconds}/>
                                        </div>
                                        <div className="background first"/>
                                    </button>
                                    <button>
                                        <div className="content second">
                                            <img
                                                alt={'copy'} src={minutes}/>

                                        </div>
                                        <div className="background second"/>
                                    </button>
                                    <button>
                                        <div className="content third">
                                            <img alt={'copy'} src={hours}/>
                                        </div>
                                        <div className="background third"/>
                                    </button>
                                </div>
                            </div> 

                //             <div className="circle-outer">
                //                 <ul className="circle-split">
                //                     <li>
                //                         <div className="content first">
                //                             <div className="icon">
                //                             </div>
                //                             {(this.props.isEditable) ? <img onClick={this.props.toggleEdit} alt={'edit'}
                //                                                             src={edit}/> : ''}
                //                         </div>
                //                         <div className="background"/>
                //                     </li>
                //                     <li>
                //                         <div className="content second">
                //                             <div className="icon">
                //                             </div>
                //                             <img
                //                                 onClick={() => this.props.handleObjectiveClone(this.props.goalId, this.props.id)}
                //                                 alt={'copy'} src={copy}/>
                //                         </div>
                //                         <div className="background"/>
                //                     </li>
                //                 </ul>
                //             </div> : (this.props.showDelete) ?
                // <div className="circle-outer">
                //     <ul className="circle-split">
                //         <li>
                //             <div className="content first">
                //                 <div className="icon">
                //                 </div>
                //                 <img
                //                     onClick={() => this.props.handleObjectiveClone(this.props.goalId, this.props.id)}
                //                     alt={'copy'} src={copy}/>
                //             </div>
                //             <div className="background"/>
                //         </li>
                //         <li>
                //             <div className="content second">
                //                 <div className="icon">
                //                 </div>
                //                 <img
                //                     onClick={() => this.props.deleteGoal(this.props.goalId, this.props.id)}
                //                     alt={'copy'} src={trash}/>

                //             </div>
                //             <div className="background"/>
                //         </li>
                //     </ul>
                // </div> :
                // <div className="circle-outer">
                //     <div className="circle">
                //         <img onClick={() => this.props.handleObjectiveClone(this.props.goalId, this.props.id)}
                //              alt={'copy'} src={copy}/>
                //             <div className="background"/>
                //     </div>
                // </div>

        // );

}
export default TripleSelectActionButton;