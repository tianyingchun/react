import React, { Component } from 'react'
import ScrollArea from '../index';
class ScrollAreaDemo extends Component {

  render () {
    /*<ScrollArea speed={0.8} fixedWidth = {200} fixedHeight= {200} amSize={'sm'} contentClassName="content">*/
    return (
      <ScrollArea speed={0.8} amSize={'sm'} contentClassName="content">
        <div style={{width: '900px'}}>
          <p>normal scrollarea </p>
          <p>normal scrollarea </p>
          <p>normal scrollarea </p>
          <p>normal scrollarea </p>
          <p>normal scrollarea </p>
          <p>normal scrollarea </p>
          <p>normal scrollarea </p>
          <p>normal scrollarea </p>
          <p>normal scrollarea </p>
          <p>normal scrollarea </p>
          <p>normal scrollarea </p>
          <p>normal scrollarea </p>
          <p>normal scrollarea </p>
          <p>normal scrollarea </p>
          <p>normal scrollarea </p>
          <p>normal scrollarea </p>
          <p>normal scrollarea </p>
          <p>normal scrollarea </p>
          <p>normal scrollarea </p>
          <p>normal scrollarea </p>
          <p>normal scrollarea </p>
          <p>normal scrollarea </p>
          <p>normal scrollarea </p>
          <p>normal end....... </p>
        </div>
      </ScrollArea>
    );
  }
}

export default ScrollAreaDemo;
