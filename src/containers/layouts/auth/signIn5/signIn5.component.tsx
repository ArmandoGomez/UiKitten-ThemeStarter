import React from 'react';
import { View } from 'react-native';
import {
  ThemedComponentProps,
  ThemeType,
  withStyles,
} from 'react-native-ui-kitten';
import {
  Button,
  Tab,
  TabView,
  Text,
} from 'react-native-ui-kitten';
import {
  SignInForm3,
  SignInForm3Data,
  SignInForm4,
  SignInForm4Data,
} from '@src/components/auth';
import {
  ScrollableAvoidKeyboard,
  ImageOverlay,
  textStyle,
} from '@src/components/common';
import {
  imageSignIn5Bg,
  ImageSource,
} from '@src/assets/images';

interface ComponentProps {
  onSignInEmailPress: (formData: SignInForm3Data) => void;
  onSignInSMSPress: (formData: SignInForm4Data) => void;
  onSignUpPress: () => void;
}

const TAB_INDEX_EMAIL: number = 0;
const TAB_INDEX_SMS: number = 1;

export type SignIn5Props = ThemedComponentProps & ComponentProps;

interface State {
  selectedTabIndex: number;
  emailFormData: SignInForm3Data;
  smsFormData: SignInForm4Data;
}

class SignIn5Component extends React.Component<SignIn5Props, State> {

  public state: State = {
    selectedTabIndex: 0,
    emailFormData: undefined,
    smsFormData: undefined,
  };

  private backgroundImage: ImageSource = imageSignIn5Bg;

  private onSignInButtonPress = () => {
    const { selectedTabIndex } = this.state;

    const formValue: SignInForm3Data | SignInForm4Data = this.getSelectedFormData();

    switch (selectedTabIndex) {
      case TAB_INDEX_EMAIL:
        this.props.onSignInEmailPress(formValue as SignInForm3Data);
        break;
      case TAB_INDEX_SMS:
        this.props.onSignInSMSPress(formValue as SignInForm4Data);
        break;
    }
  };

  private onSignUpButtonPress = () => {
    this.props.onSignUpPress();
  };

  private onTabSelect = (selectedTabIndex: number) => {
    this.setState({ selectedTabIndex });
  };

  private onEmailFormDataChange = (emailFormData: SignInForm3Data | undefined) => {
    this.setState({ emailFormData });
  };

  private onSMSFormDataChange = (smsFormData: SignInForm4Data | undefined) => {
    this.setState({ smsFormData });
  };

  private getSelectedFormData = (): SignInForm3Data | SignInForm4Data => {
    const { selectedTabIndex, emailFormData, smsFormData } = this.state;

    switch (selectedTabIndex) {
      case TAB_INDEX_EMAIL:
        return emailFormData;
      case TAB_INDEX_SMS:
        return smsFormData;
    }
  };

  public render(): React.ReactNode {
    const { themedStyle } = this.props;
    const signInButtonEnabled: boolean = !!this.getSelectedFormData();

    return (
      <ScrollableAvoidKeyboard>
        <ImageOverlay
          style={themedStyle.container}
          source={this.backgroundImage.imageSource}>
          <View style={themedStyle.headerContainer}>
            <Text
              style={themedStyle.helloLabel}>
              Sign In
            </Text>
            <Text
              style={themedStyle.signInLabel}
              category='s1'>
              Sign in to your account with Email or SMS
            </Text>
          </View>
          <TabView
            style={themedStyle.tabView}
            tabBarStyle={themedStyle.tabBar}
            indicatorStyle={themedStyle.tabViewIndicator}
            selectedIndex={this.state.selectedTabIndex}
            onSelect={this.onTabSelect}>
            <Tab
              titleStyle={themedStyle.tabTitle}
              title='EMAIL'>
              <SignInForm3
                style={themedStyle.tabContentContainer}
                onDataChange={this.onEmailFormDataChange}
              />
            </Tab>
            <Tab
              titleStyle={themedStyle.tabTitle}
              title='SMS'>
              <View>
                <SignInForm4
                  style={themedStyle.tabContentContainer}
                  onDataChange={this.onSMSFormDataChange}
                />
                <Text
                  style={themedStyle.smsCaptionLabel}
                  appearance='hint'>
                  within a minute you should receive
                  an SMS with the code
                </Text>
              </View>
            </Tab>
          </TabView>
          <Button
            style={themedStyle.signInButton}
            textStyle={textStyle.button}
            size='giant'
            disabled={!signInButtonEnabled}
            onPress={this.onSignInButtonPress}>
            SIGN IN
          </Button>
          <Button
            style={themedStyle.signUpButton}
            textStyle={themedStyle.signUpText}
            appearance='ghost'
            activeOpacity={0.75}
            onPress={this.onSignUpButtonPress}>
            Don't have an account? Sign Up
          </Button>
        </ImageOverlay>
      </ScrollableAvoidKeyboard>
    );
  }
}

export const SignIn5 = withStyles(SignIn5Component, (theme: ThemeType) => ({
  container: {
    flex: 1,
  },
  headerContainer: {
    minHeight: 216,
    paddingHorizontal: 64,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabContentContainer: {
    marginVertical: 8,
  },
  tabView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  tabBar: {
    backgroundColor: 'transparent',
  },
  tabViewIndicator: {
    backgroundColor: theme['background-basic-color-1'],
  },
  tabTitle: {
    color: 'white',
    ...textStyle.label,
  },
  helloLabel: {
    fontSize: 26,
    lineHeight: 32,
    color: 'white',
    ...textStyle.headline,
  },
  signInLabel: {
    marginTop: 8,
    textAlign: 'center',
    color: 'white',
    ...textStyle.subtitle,
  },
  smsCaptionLabel: {
    textAlign: 'center',
    paddingHorizontal: 32,
    ...textStyle.paragraph,
  },
  signInButton: {
    marginHorizontal: 16,
  },
  signUpButton: {
    marginVertical: 12,
  },
  signUpText: {
    color: 'white',
    ...textStyle.subtitle,
  },
}));

