import React, { useEffect } from 'react';
import './Footer.scss';

const Footer = () => {

  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init('4a825a353a1de4052c7ca964c7a71fe7');
    }

    window.Kakao.Share.createDefaultButton({
      container: '#kakao-share-btn',
      objectType: 'feed',
      content: {
        title: '딸기 치즈 케익',
        description: '#케익 #딸기 #삼평동 #카페 #분위기 #소개팅',
        imageUrl: 'http://k.kakaocdn.net/dn/Q2iNx/btqgeRgV54P/VLdBs9cvyn8BJXB3o7N8UK/kakaolink40_original.png',
        link: {
          mobileWebUrl: 'https://heemangpass.co.kr',
          webUrl: 'https://heemangpass.co.kr',
        },
      },
      buttons: [
        {
          title: '웹으로 보기',
          link: {
            mobileWebUrl: 'https://heemangpass.co.kr',
            webUrl: 'https://heemangpass.co.kr',
          },
        },
      ],
    });
  }, []);

  
  const handleShare = async () => {
    const env = detectEnvironment();
    const url = 'https://happybean.naver.com';
  
    if (navigator.share) {
      try {
        await navigator.share({
          title: '공유 제목',
          text: '공유할 내용',
          url,
        });
        console.log('공유 성공');
      } catch (err) {
        console.warn('공유 실패', err);
      }
    } else {
      if (env.isWindows) {
        alert('이 브라우저는 공유 기능을 지원하지 않아. Chrome 최신버전이나 모바일 기기에서 시도해봐.');
      } else if (env.isMac && env.isSafari) {
        alert('Safari는 공유 기능을 지원하지만 현재 사용 중인 Safari 버전이 안 맞을 수 있어.');
      } else if (env.isMac) {
        alert('macOS에서는 Safari에서만 공유 기능이 제대로 작동해.');
      } else {
        alert('이 환경에서는 공유 기능을 지원하지 않아.');
      }
  
      try {
        await navigator.clipboard.writeText(url);
        alert(`공유할 링크가 복사됐어:\n${url}`);
      } catch {
        alert(`복사도 실패했어. 수동으로 복사해:\n${url}`);
      }
    }
  };
  
  const detectEnvironment = () => {
    const ua = navigator.userAgent.toLowerCase();
    return {
      isWindows: navigator.platform.startsWith('Win'),
      isMac: navigator.platform.startsWith('Mac'),
      isAndroid: ua.includes('android'),
      isIOS: /iphone|ipad|ipod/.test(ua),
      isSafari: /^((?!chrome|android).)*safari/i.test(navigator.userAgent),
      isChrome: ua.includes('chrome') && !ua.includes('edg'),
      isEdge: ua.includes('edg'),
      isFirefox: ua.includes('firefox'),
    };
  };
  

    
  return (
    <footer className="footer">
        <div className="footer__content">
          <div className="footer__mobile"><img src="/assets/footer/footer.gif" alt="" /></div>
          <div className="footer__title">유의사항</div>
          <ul className="footer__list">
            <li>본 이벤트는 스마일게이트 희망스튜디오에서 진행되는 이벤트입니다.</li>
            <li>본 이벤트 당첨자는 이벤트 기간 내 참여자에 한하여 선정되며, 이벤트 당첨 및 경품 발송을 위해 당첨자를 대상으로<br />
              개인정보를 수집합니다. 개인정보 수집에 동의하지 않는 경우 경품 지급이 제한될 수 있습니다.</li>
            <li>수집된 개인 정보는 경품 발송 시에만 사용되며, 이벤트 종료 후 60일 이내에 폐기됩니다.</li>
            <li>이벤트 경품은 카카오톡 희망스튜디오 채널 친구 추가를 유지하고 있어야 수령 가능합니다.</li>
            <li>이벤트 경품은 타인에게 양도 및 판매를 금지합니다.</li>
            <li>제공되는 경품은 사정에 따라 유사 상품으로 대체될 수 있습니다.</li>
            <li>경품 지급은 이벤트 종료 후 최대 2~4주 소요될 수 있으며, 내부 사정에 따라 경품 지급 일정은 지연될 수 있습니다.</li>
            <li>경품 지급은 이벤트 참여자 정보를 기준으로 진행되며, 정보 오기입에 따른 불이익은 당사에서 책임지지 않습니다.</li>
            <li>본 이벤트를 악용하거나 부정한 방법 또는 비정상적인 방법에 의한 참여의 경우,<br />
              당첨 시 사전 고지 없이 당첨이 취소될 수 있으며, 추후 이벤트에 참여 제한이 발생할 수 있습니다.</li>
            <li>5만원 초과 경품(닌텐도스위치2)에서 발생하는 제세공과금은 당첨자가 부담하며, 소득세법에 따라 납부해야 하는<br />
              제세공과금 경품 금액의 22% 발생됩니다. 원천세 신고 처리의 의무에 따라 당첨자의 주민등록번호가 필수정보로 사용됩니다.</li>
            <li>경품 제세공과금 22%는 당첨자 본인 부담입니다.</li>
            <li>14세 미만은 이벤트 참여가 제한됩니다.</li>
            <li>본 이벤트는 경품 발송 목적으로 국내 거주자를 대상으로 이뤄집니다.</li>
            <li>모바일 쿠폰 형식으로 발송되는 경품의 경우 유효기간 내 사용 가능하며, 발송된 쿠폰의 유효기간 경과와 발송 문자의 삭제 및<br />
              분실에 의한 재발송은 불가합니다.</li>
            <li>경품 발송 및 제세공과금 처리를 목적으로 개별 연락을 통해 개인 정보 수집 및 동의를 요청할 수 있습니다.</li>
            <li>경품 제공을 위해 수탁업체에 당첨자의 개인정보를 제공하고 경품발송업무를 위탁합니다.<br />
              (수탁사 : 마케팅웨이브, 제공범위 : 이름, 연락처, 메일주소, 희망스튜디오 ID, 주소, 대상업무 : 이벤트 경품 발송,<br />
              폐기시점 : 경품발송 목적 달성 후 폐기(25.12.25 이내))</li>
            <li>이벤트 관련 문의는 ㈜마케팅웨이브 jhko@mwave.co.kr로 문의 바라며, 문의 확인 시간은 평일 10시~17시 입니다.</li>
          </ul>
        </div>
        <div className="footer__share">
          <a
          href="https://twitter.com/intent/tweet?url=https://heemangpass.co.kr&text=공유할 텍스트"
          target="_blank"
          rel="noopener noreferrer"
          className="footer__share-btn"
          >
          트위터 공유
        </a>

        <a
          href="https://www.facebook.com/sharer/sharer.php?u=https://heemangpass.co.kr"
          target="_blank"
          rel="noopener noreferrer"
          className="footer__share-btn"
        >
          페이스북 공유
        </a>

        <button onClick={handleShare}>
          공유
        </button>

        <button id="kakao-share-btn">
          카카오톡 공유
        </button>

        

        </div>
    </footer>
  );
};

export default Footer;