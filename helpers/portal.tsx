import * as React from 'react';
import ReactDOM from 'react-dom';

type PortalProps = {};
type PortalState = {
  mounted: boolean
};

export class Portal extends React.Component<PortalProps, PortalState> {

  state = {
    mounted: false
  };

  public element: null | Element = null;

  componentDidMount() {
    this.element = document.createElement('div');
    document.body.classList.add('overflow');
    document.body.appendChild(this.element);
    this.setState(() => ({ mounted: true }));
  }

  componentWillUnmount() {
    if (this.element) {
      document.body.classList.remove('overflow');
      document.body.removeChild(this.element);
    }
  }

  render() {
    const { children } = this.props;
    const { mounted } = this.state;
    return (mounted && this.element) ? ReactDOM.createPortal(children, this.element) : null;
  }
}
