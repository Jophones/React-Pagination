import React from 'react'

export default class Hello extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selsectedNum:0,
            view:5,
            total:9
        }
    }

    componentDidMount(){

    }

    pagationFun(selsected,total,view){
        var page = []
        if(total < view){
            for(var i=0;i<total;i++){
                page[i] = {num: i+1,normal: true}
                page[selsected] = {num:selsected+1,selsected:true,normal: true}                
            }
        }else{
            let difference = (view-2-1)/2
            if(difference >= selsected-difference){
                for(var i=0;i<=view;i++){
                    page[i] = {num: i+1,normal: true}
                }
                page[view-1] = {ellipsis:true}
                page[selsected] = {num:selsected+1,selsected:true,normal: true}
                page[view] = {normal: true,num: total}     
            }else if(selsected > total - difference-3){
                for(var i=view,j = 0;i>=0;i--,j++){
                    page[i] = {num: total - j,normal: true}
                }
                page.map((item)=>{
                    if(selsected+1 == item.num){item.selsected ={num:selsected+1,selsected:true,normal: true} }
                })
                page[1] = {ellipsis:true}
                // page[total-view] = {num:selsected+1,selsected:true,normal: true}
                page[0] = {normal: true,num: 1}  
            }else{
                let firstSelectNum = selsected - difference
                for(let i = (view + 1) / 2 - difference, j = 0; i <= (view + 1) / 2 + difference; i++, j++) {
                    page[i] = {num: firstSelectNum + j+1,normal: true,}
                } 
                page[(view + 1) / 2] = {num: selsected+1,selsected: true,normal: true
                }
                page[0]= {normal: true,num: 1}
                page[1]={ellipsis: true}
                page[view]={ellipsis: true}
                page[view+1] = {normal: true,num: total}
            }
        }
        return page
    }

    handleSelectPage(item){
        const {selsectedNum} = this.state
        const currentNum = item.num-1
        if(selsectedNum == currentNum){
            return false
        }else{
            this.setState({selsectedNum:currentNum})
        }

        // this.props.handleSelectPage(item)
    }

    handleSelectUpPage(){
        const {selsectedNum} = this.state
        if(selsectedNum == 0){
            return false 
        }else{
            this.setState({selsectedNum:selsectedNum-1})            
        }

        // this.props.handleSelectPage(selsectedNum-1)
    }

    handleSelectDownPage(){
        const {selsectedNum,view,total} = this.state
        if(selsectedNum+1 == total){
            return false 
        }else{
            this.setState({selsectedNum:selsectedNum+1})
        }
    }

    handleFirstAndLastPage(page){
        const {selsectedNum,view,total} = this.state
        this.setState({selsectedNum:page})
    }

    render() {
        const {selsectedNum,view,total} = this.state
        console.log("选中",selsectedNum)
        return <div>
            <h1 onClick={()=>{this.pagationFun(4,8,7)}}>Hello world</h1>
            <div>
                <span style={upAndDownPager} onClick={()=>{this.handleFirstAndLastPage(0)}}>首</span>
                <span style={upAndDownPager} onClick={()=>{this.handleSelectUpPage()}}>上</span>
                {this.pagationFun(selsectedNum,total,view).map((item)=>{
                    if(item.normal){
                        if(item.selsected){
                             return <span style={pageSelect} onClick={()=>{this.handleSelectPage(item)}}>{item.num}</span>
                        }
                        return <span style={pageBorder} onClick={()=>{this.handleSelectPage(item)}}>{item.num}</span>
                    }else if(item.ellipsis){
                        return <span style={pageEllipsis}>...</span>
                    }
                })}
                <span style={upAndDownPager} onClick={()=>{this.handleSelectDownPage()}}>下</span>
                <span style={upAndDownPager} onClick={()=>{this.handleFirstAndLastPage(total-1)}}>尾</span>
            </div>
        </div>
    }
}

const pageBorder = {
    border: "1px solid #d3d3d3",
    width: "25px",
    display: "inline-block",
    height: "25px",
    textAlign: "center",
    lineHeight: "25px",
    margin:"0 5px"
}

const  pageEllipsis = {
    width: "25px",
    display: "inline-block",
    height: "25px",
    textAlign: "center",
    lineHeight: "25px",
    margin:"0 5px"
}

const pageSelect = {
    border: "1px solid #d3d3d3",
    width: "25px",
    display: "inline-block",
    height: "25px",
    textAlign: "center",
    lineHeight: "25px",
    margin:"0 5px",
    color:"white",
    background:"lightblue"
}

const upAndDownPager ={
    border: "1px solid #d3d3d3",
    width: "25px",
    display: "inline-block",
    height: "25px",
    textAlign: "center",
    lineHeight: "25px",
    margin:"0 5px",
}