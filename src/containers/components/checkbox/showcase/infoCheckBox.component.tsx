import React from 'react';
import {
  CheckBox,
  CheckBoxProps,
} from 'react-native-ui-kitten';

interface CheckBoxShowcaseComponentState {
  checked: boolean;
}

class CheckBoxShowcaseComponent extends React.Component<CheckBoxProps, CheckBoxShowcaseComponentState> {

  static defaultProps: CheckBoxProps = {
    checked: true,
  };

  public state: CheckBoxShowcaseComponentState = {
    checked: this.props.checked,
  };

  private onChange = (checked: boolean) => {
    this.setState({ checked });
  };

  public render(): React.ReactElement<CheckBoxProps> {
    return (
      <CheckBox
        {...this.props}
        checked={this.state.checked}
        onChange={this.onChange}
      />
    );
  }
}

export const InfoCheckBox = (props?: CheckBoxProps): React.ReactElement<CheckBoxProps> => {
  return (
    <CheckBoxShowcaseComponent
      status='info'
      {...props}
    />
  );
};
