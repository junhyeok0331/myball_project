const express = require('express');
const router = express.Router();
const { Users, Shop, Item } = require('../models');

// 아이템 구매 요청
router.post('/purchase', async (req, res) => {
  try {
    const { userId, itemId } = req.body;

    // 유저, 아이템 조회
    const user = await Users.findByPk(userId);
    const item = await Item.findByPk(itemId);

    if (!user || !item) {
      return res.status(404).json({ message: '사용자 또는 아이템을 찾을 수 없습니다.' });
    }

    if (item.purchased) {
      return res.status(400).json({ message: '이미 구매한 아이템입니다.' });
    }

    if (item.shopId !== user.id) {
      const shop = await Shop.findOne({ where: { userId: user.id } });
      if (!shop || shop.id !== item.shopId) {
        return res.status(403).json({ message: '이 아이템은 해당 유저의 상점에 속하지 않습니다.' });
      }
    }

    // 포인트 차감
    if (user.points < item.price) {
      return res.status(400).json({ message: '포인트가 부족합니다.' });
    }

    user.points -= item.price;
    item.purchased = true;

    await user.save();
    await item.save();

    return res.status(200).json({ message: '아이템 구매 성공', remainingPoints: user.points });
  } catch (err) {
    console.error('[구매 오류]', err);
    return res.status(500).json({ message: '서버 오류로 인해 구매에 실패했습니다.' });
  }
});

module.exports = router;
