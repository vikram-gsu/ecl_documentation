module.exports = `# Different Types of Joins in ECL

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
