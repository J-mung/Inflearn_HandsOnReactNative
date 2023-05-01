# Inflearn_HandsOnReactNative_TodoList
Inflearn강의 "핸즈온 리액트 네이티브"로 학습하고 배우는 React Native 기록용 repository.

#### Components
* 스크롤이 필요할 때 사용하는 Component.
    * **ScrollView component**
    * 반복되는 components는 Map 함수를 활용.
    * 이때 key 지정은 필수.
        ```
        <ScrollView>
          ...
        </ScrollView>
        ```
    * **FlatList component**
    * ScrollView와 달리 key를 자동으로 할당.
    * keyExtractor prop을 통해서 직접 key를 지정할 수 있음.
    * windowSize로 rendering할 item의 개수를 조절.
    -기본값 21(1이 화면 높이).
    -현재 화면 1 + 이전 화면 10 + 다음화면 10.
    -값이 작으면 메모리 절약.
    -값이 작으면 빈 호 ㅏ면이 나올 가능성이 있음.
    * FlatList는 이미 rendering한 item까지도 re-rendering 하는 문제점이 있음.
    * React.memo를 통해 re-rendering이 필요없는 부분은 재활용함.
        ```
        <FlatList
            data={[...]}
            renderItem={({item}) => {...}
            keyExtractor={(item) => {return String}}
            windowSize
            }
        />
        ```
    * **차이점**
        * ScrollView
        -한 번에 모든 목록을 rendering.
        -데이터의 양이 많지 않고, 크기가 정해져 있을 때 사용.
        -ex) 회원가입
        * FlatList
        -필요한 만큼만 rendering.
        -데이터의 양이 많거나, 크기를 예측할 수 없을 때 사용.
        -ex) 친구 목록, 글 목록
        
#### React API
* **React.memo**
    * props에 변화가 없을 때 re-rendering을 방지.
    * 컴포넌트 rendering 결과를 기억하고 있다가 re-rendering을 해야 할 때, 변화가 없으면 기억하고 있던 rendering 결과를 재사용.
    * props의 변경 여부가 아닌 다른 이유로 인한 rendering에는 영향을 주지 않음.
    * 결과를 기억하기 위해 내부적으로 작업이 수행되므로 무분별한 사용은 금물.
* **React.useEffect**
    * React component가 rendering될 때마가 특정 작업을 실행할 수 있는 Hook.
    * component가 mount / unmount / update 되면 해당 Hook이 수행됨.
    * CleanUp func(뒷정리 함수)
    event object를 해당 Hook에서 다룰 때, mount될 때마다 object가 생성되는 경우가 있음.
    따라서 CleanUp func를 통해 unmount될 때, 생성한 object를 제거하는 것으로 해결 가능.
    commit 2681894dd5f9... 참조.


#### 유용한 기능
* Command + P(Control + P) > 파일 이름 검색.
* Command + P(Control + P) > @ + 함수 이름 검색.
* Command + P(Control + P) > # + 함수 이름 검색.
* User snippets
    * 자주 사용하는 코드를 단축어로 설정하여 반복 작업을 수월하게 함.
* Control + alt + 방향키(위, 아래) > 커서 다중 선택.
* Control + K -> Control + C > 블럭 주석 처리.
* Alt + Shift + A > 블럭 주석 처
