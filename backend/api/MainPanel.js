// routes/mainPanel.js
const express = require('express');
const router = express.Router();
const { Users, Player } = require('../models');
const { Shop, Item } = require('../models');  // Shop, Item 모델 추가 임포트

// 🔹 팀 정보 조회
router.get('/team', async (req, res) => {
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
      return res.status(400).json({ message: '팀 정보가 설정되어 있지 않습니다.' });
    }

    const players = await Player.findAll({ where: { team: user.team } });

    return res.status(200).json({
      message: '팀 정보 및 선수 목록 조회 성공',
      team: user.team,
      players,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: '서버 오류로 팀 정보를 불러오지 못했습니다.' });
  }
});

// routes/mainPanel.js (이어서 계속)
router.get('/point', async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ message: 'userId가 필요합니다.' });
    }

    const user = await Users.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
    }

    return res.status(200).json({
      message: '포인트 정보 조회 성공',
      point: user.point,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: '서버 오류로 포인트 정보를 불러오지 못했습니다.' });
  }
});

// 아이템 구매 상태 조회 (모자, 티셔츠 기준)
router.get('/items/status', async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ message: 'userId가 필요합니다.' });
    }

    // 유저가 있는지 확인
    const user = await Users.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
    }

    // 상점 정보 가져오기 (userId로)
    const shop = await Shop.findOne({ where: { userId } });
    if (!shop) {
      return res.status(404).json({ message: '상점 정보를 찾을 수 없습니다.' });
    }

    // 상점에 속한 아이템 목록 가져오기 (모자와 티셔츠 이름으로 필터링)
    const items = await Item.findAll({
      where: {
        shopId: shop.id,
        name: ['윈지 모자', '윈지 티셔츠'],
      }
    });

    // 구매 상태 변수 초기화
    let hatPurchased = false;
    let tshirtPurchased = false;

    // 아이템 구매 여부 확인
    items.forEach(item => {
      if (item.name === '윈지 모자' && item.purchased) hatPurchased = true;
      if (item.name === '윈지 티셔츠' && item.purchased) tshirtPurchased = true;
    });

    // 상태 결정 (1~4)
    let status = 1;
    if (hatPurchased && tshirtPurchased) status = 4;
    else if (hatPurchased) status = 2;
    else if (tshirtPurchased) status = 3;

    return res.status(200).json({
      message: '아이템 상태 조회 성공',
      status,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: '서버 오류로 아이템 상태를 불러오지 못했습니다.' });
  }
});

module.exports = router;