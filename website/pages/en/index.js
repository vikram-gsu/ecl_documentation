/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');

const MarkdownBlock = CompLibrary.MarkdownBlock; /* Used to read markdown */
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;
const LandingPageQuery = `# Different Types of Joins in ECL

\`\`\`ecl
MyRec := RECORD
  STRING1 Value1;
  STRING1 Value2;
END;

LeftFile := DATASET([{'C','A'},
                      {'X','B'},
                      {'A','C'}],MyRec);

RightFile := DATASET([{'C','X'},
                      {'B','Y'},
                      {'A','Z'}],MyRec);

MyOutRec := RECORD
  STRING1 Value1;
  STRING1 LeftValue2;
  STRING1 RightValue2;
END;

MyOutRec JoinThem(MyRec L, MyRec R) := TRANSFORM
  SELF.Value1 := IF(L.Value1<>'', L.Value1, R.Value1);
  SELF.LeftValue2 := L.Value2;
  SELF.RightValue2 := R.Value2;
END;

InnerJoinedRecs := JOIN(LeftFile,RightFile, LEFT.Value1 = RIGHT.Value1, JoinThem(LEFT,RIGHT));
LOutJoinedRecs := JOIN(LeftFile,RightFile, LEFT.Value1 = RIGHT.Value1, JoinThem(LEFT,RIGHT), LEFT OUTER);
ROutJoinedRecs := JOIN(LeftFile,RightFile, LEFT.Value1 = RIGHT.Value1, JoinThem(LEFT,RIGHT), RIGHT OUTER);
FOutJoinedRecs := JOIN(LeftFile,RightFile, LEFT.Value1 = RIGHT.Value1, JoinThem(LEFT,RIGHT), FULL OUTER);
LOnlyJoinedRecs := JOIN(LeftFile,RightFile, LEFT.Value1 = RIGHT.Value1, JoinThem(LEFT,RIGHT), LEFT ONLY);
ROnlyJoinedRecs := JOIN(LeftFile,RightFile, LEFT.Value1 = RIGHT.Value1, JoinThem(LEFT,RIGHT), RIGHT ONLY);
FOnlyJoinedRecs := JOIN(LeftFile,RightFile, LEFT.Value1 = RIGHT.Value1, JoinThem(LEFT,RIGHT), FULL ONLY);


OUTPUT(InnerJoinedRecs,,NAMED('Inner'));
OUTPUT(LOutJoinedRecs,,NAMED('LeftOuter'));
OUTPUT(ROutJoinedRecs,,NAMED('RightOuter'));
OUTPUT(FOutJoinedRecs,,NAMED('FullOuter'));
OUTPUT(LOnlyJoinedRecs,,NAMED('LeftOnly'));
OUTPUT(ROnlyJoinedRecs,,NAMED('RightOnly'));
OUTPUT(FOnlyJoinedRecs,,NAMED('FullOnly'));
\`\`\`
`
const LandingPageResult = `
#### Left Dataset(LeftFile)

| Value1  | Value2 |
|---------|--------|
| C | A |
| X | B |
| A | C |

#### Right Dataset (RightFile)

| Value1  | Value2 |
|---------|--------|
| C | X |
| B | Y |
| A | Z |

#### Inner Join Results (InnerJoinedRecs)

|Rec#| Value1  | LeftValue2 | RightValue2 |
|----|---------|------------|------------|
|1| A | C | Z |
|2| C | A | X |

#### Left Outer Join Results (LOutJoinedRecs)

|Rec#| Value1  | LeftValue2 | RightValue2 |
|----|---------|------------|------------|
|1| A | C | Z |
|2| C | A | X |
|3| X | B |  |

#### Right Outer Join Results (ROutJoinedRecs)

|Rec#| Value1  | LeftValue2 | RightValue2 |
|----|---------|------------|------------|
|1| A | C | Z |
|2| B |   | Y |
|3| C | A | X |

#### Full Outer Join Results (FOutJoinedRecs)

|Rec#| Value1  | LeftValue2 | RightValue2 |
|----|---------|------------|------------|
|1| A | C | Z |
|2| B |   | Y |
|3| C | A | X |
|4| X | B |   |

#### Left Only Join Results (LOnlyJoinedRecs)

|Rec#| Value1  | LeftValue2 | RightValue2 |
|----|---------|------------|------------|
|1| X | B |  |

#### Right Only Join Results (ROnlyJoinedRecs)

|Rec#| Value1  | LeftValue2 | RightValue2 |
|----|---------|------------|------------|
|1| B |  | Y |

#### Full Only Join Results (FOnlyJoinedRecs)

|Rec#| Value1  | LeftValue2 | RightValue2 |
|----|---------|------------|------------|
|1| B |  | Y |
|2| X | B|  |

`

class HomeSplash extends React.Component {
  render() {
    const {siteConfig, language = ''} = this.props;
    const {baseUrl, docsUrl} = siteConfig;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
    const langPart = `${language ? `${language}/` : ''}`;
    const docUrl = doc => `${baseUrl}${docsPart}${langPart}${doc}`;

    const SplashContainer = props => (
      <div className="homeContainer">
        <div className="homeSplashFade">
          <div className="wrapper homeWrapper">{props.children}</div>
        </div>
      </div>
    );

    const Logo = props => (
      <div className="projectLogo">
        <img src={props.img_src} alt="Project Logo" />
      </div>
    );

    const ProjectTitle = () => (
      <h2 className="projectTitle">
        {siteConfig.title}
        <small>{siteConfig.tagline}</small>
      </h2>
    );

    const PromoSection = props => (
      <div className="section promoSection">
        <div className="promoRow">
          <div className="pluginRowBlock">{props.children}</div>
        </div>
      </div>
    );

    const Button = props => (
      <div className="pluginWrapper buttonWrapper">
        <a className="button" href={props.href} target={props.target}>
          {props.children}
        </a>
      </div>
    );

    return (
      <SplashContainer>
        <div className="inner">
          <ProjectTitle siteConfig={siteConfig} />
          <PromoSection>
            <Button href="#try">Try It Out</Button>
            <Button href={docUrl('doc1.html')}>Example Link</Button>
            <Button href={docUrl('doc2.html')}>Example Link 2</Button>
          </PromoSection>
        </div>
      </SplashContainer>
    );
  }
}

class Index extends React.Component {
  render() {
    const {config: siteConfig, language = ''} = this.props;
    const {baseUrl} = siteConfig;

    const Block = props => (
      <Container
        padding={['bottom', 'top']}
        id={props.id}
        background={props.background}>
        <GridBlock
          align="center"
          contents={props.children}
          layout={props.layout}
        />
      </Container>
    );

    const FeatureCallout = () => (
      <div className="sample-code-container">
        <div
          className="productShowcaseSection paddingBottom"
          style={{textAlign: 'left',width:'50%'}}>
          <MarkdownBlock>{LandingPageQuery}</MarkdownBlock>
        </div>

        <div
          className="productShowcaseSection paddingBottom"
          style={{textAlign: 'left',width:'50%'}}>
          <MarkdownBlock>{LandingPageResult}</MarkdownBlock>
        </div>

      </div>
    );

    const TryOut = () => (
      <Block id="try">
        {[
          {
            content: 'Talk about trying this out',
            image: `${baseUrl}img/favicon.png`,
            imageAlign: 'left',
            title: 'Try it Out',
          },
        ]}
      </Block>
    );

    const Description = () => (
      <Block background="dark">
        {[
          {
            content:
              'This is another description of how this project is useful',
            image: `${baseUrl}img/favicon.png`,
            imageAlign: 'right',
            title: 'Description',
          },
        ]}
      </Block>
    );

    const LearnHow = () => (
      <Block background="light">
        {[
          {
            content: 'Talk about learning how to use this',
            image: `${baseUrl}img/favicon.png`,
            imageAlign: 'right',
            title: 'Learn How',
          },
        ]}
      </Block>
    );

    const Features = () => (
      <Block layout="fourColumn">
        {[
          {
            content: 'This is the content of my feature',
            image: `${baseUrl}img/favicon.png`,
            imageAlign: 'top',
            title: 'Feature One',
          },
          {
            content: 'The content of my second feature',
            image: `${baseUrl}img/favicon.png`,
            imageAlign: 'top',
            title: 'Feature Two',
          },
        ]}
      </Block>
    );

    const Showcase = () => {
      if ((siteConfig.users || []).length === 0) {
        return null;
      }

      const showcase = siteConfig.users
        .filter(user => user.pinned)
        .map(user => (
          <a href={user.infoLink} key={user.infoLink}>
            <img src={user.image} alt={user.caption} title={user.caption} />
          </a>
        ));

      const pageUrl = page => baseUrl + (language ? `${language}/` : '') + page;

      return (
        <div className="productShowcaseSection paddingBottom">
          <h2>Who is Using This?</h2>
          <p>This project is used by all these people</p>
          <div className="logos">{showcase}</div>
          <div className="more-users">
            <a className="button" href={pageUrl('users.html')}>
              More {siteConfig.title} Users
            </a>
          </div>
        </div>
      );
    };

    return (
      <div>
        <HomeSplash siteConfig={siteConfig} language={language} />
        <FeatureCallout />
      </div>
    );
  }
}

module.exports = Index;
