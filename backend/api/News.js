// routes/news.js
const express = require('express');
const router = express.Router();
const { Users, Player } = require('../models');

// GET /news?userId=숫자
// userId로 유저의 팀명과 대표 선수명(캐릭터 이름) 반환
router.get('/', async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ message: 'userId가 필요합니다.' });
    }

    const user = await Users.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
    }

    if (!user.team) {
      return res.status(400).json({ message: '유저 팀 정보가 없습니다.' });
    }

    // 예: 팀에 속한 선수 중 대표 선수(예: 첫 번째 선수) 가져오기
    const player = await Player.findOne({ where: { team: user.team } });
    if (!player) {
      return res.status(404).json({ message: '팀에 소속된 선수가 없습니다.' });
    }

    return res.status(200).json({
      message: '뉴스용 팀명 및 선수명 조회 성공',
      teamName: user.team,
      playerName: player.name,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: '서버 오류로 정보를 불러오지 못했습니다.' });
  }
});

module.exports = router;