import { useEffect, useRef } from 'react';
import ChatBubbleGroup from './ChatBubbleGroup';

export default function ChatContent() {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current!.scrollIntoView({ behavior: 'auto' });
  }, []);

  return (
    <>
      <div className="flex h-[calc(100%-220px)] w-full flex-col gap-5 overflow-y-auto whitespace-pre-line">
        <ChatBubbleGroup
          isMy={false}
          name="김덕배"
          message={[
            { message: '다들 이번 책 읽어오셨나요?', time: '오후 12:12' },
            {
              message:
                '이번에도 참여 저조하신 분 혹은 읽지 않은 분은 재명입니다',
              time: '오후 12:12',
            },
          ]}
        />
        <ChatBubbleGroup
          isMy={false}
          name="김뿌링"
          message={[
            { message: '덕배님 인간적으로', time: '오후 12:14' },
            {
              message:
                '이틀에 한권에 3일에 1번씩 토론 가지는 건 너무 빡세요...',
              time: '오후 12:15',
            },
          ]}
        />
        <ChatBubbleGroup
          isMy={true}
          name="김뿡빵삥"
          message={[
            {
              message: '저도 그렇게 생각해요..너무 힘들어요',
              time: '오후 12:15',
            },
            { message: '현생도 생각해주세요 덕배님...', time: '오후 12:15' },
          ]}
        />
        <ChatBubbleGroup
          isMy={false}
          name="김덕배"
          message={[
            {
              message: `강요하진 않습니다. 다만 저희 모임은 정책이 빡셀 뿐이에요.
              마음에 안 드신다면 다른 모임 가입을 권유 드립니다.`,
              time: '오후 12:21',
            },
          ]}
        />
        <ChatBubbleGroup
          isMy={true}
          name="김뿡빵삥"
          message={[
            {
              message: `솔직히 말해서 저도 이 모임이 좋아서, 그리고 함께 책 읽고 이야기 나누는 시간이 의미 있어서 계속 참여하고 있는 거예요. 하지만 요즘 모임 운영 방식은 너무 속도 위주라는 느낌이 강해서 점점 부담이 되는 것도 사실입니다.

                    책은 단순히 읽는 데서 끝나는 게 아니라, 읽고 생각하고 소화한 걸 나누는 과정이 중요한데, 이틀에 한 권, 3일에 한 번 토론은 그 깊이를 놓치게 만드는 것 같아요. 현실적으로 각자 직장이나 개인 사정이 있다 보니 그렇게 자주, 또 빨리 따라가는 게 버겁다는 이야기가 나오는 건 당연하다고 생각해요.

                    덕배님께서도 운영에 신경 많이 써주시고 애써주시는 거 알고 있어요. 그 점은 정말 감사하게 생각합니다. 다만, 더 많은 사람들이 꾸준히 즐겁게 참여할 수 있으려면, 일정이나 방식에 조금 더 유연함이 있었으면 좋겠습니다. 이 모임이 단순한 규율 위주의 시스템이 아니라, 책을 좋아하는 사람들이 모여 서로 존중하고 응원하는 공간이었으면 해요.

                    서로 이야기 나누며 조율해 나가는 것도 독서 모임의 일부라고 생각합니다. 그래서 이번 논의도 단순한 불만 제기가 아니라, 우리가 더 나은 방향으로 함께 가기 위한 의견 제시로 받아들여주셨으면 좋겠습니다.`,
              time: '오후 12:46',
            },
          ]}
        />
        <ChatBubbleGroup
          isMy={false}
          name="김덕배"
          message={[
            {
              message: '흠..',
              time: '오후 12:47',
            },
          ]}
        />
        <div ref={bottomRef} />
      </div>
    </>
  );
}
