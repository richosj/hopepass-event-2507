@echo off
echo ====== React Build 시작 ======
cd /d "C:\Users\test\Desktop\github\private\project\hopepass-event-2507\frontend"
call npm run build

echo ====== 서버로 빌드 파일 전송 중 ======
scp -r ..\backend\public\* root@114.207.245.174:/home/hopepass-event-2507/backend/public/

echo ====== 완료! 브라우저에서 새로고침 해봐 ======
pause