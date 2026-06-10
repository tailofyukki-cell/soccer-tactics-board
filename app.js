/**
 * サッカー戦術ボード - メインスクリプト
 * Canvas描画 + マウスドラッグ + 選手情報編集 + 保存/読込
 */

'use strict';

// ===========================
// フォーメーション定義
// ===========================
const FORMATIONS = {
  '4-4-2': {
    own: [
      { number: 1,  name: 'GK',   rx: 0.05, ry: 0.50 },
      { number: 2,  name: 'RB',   rx: 0.18, ry: 0.20 },
      { number: 5,  name: 'CB',   rx: 0.18, ry: 0.38 },
      { number: 4,  name: 'CB',   rx: 0.18, ry: 0.62 },
      { number: 3,  name: 'LB',   rx: 0.18, ry: 0.80 },
      { number: 7,  name: 'RMF',  rx: 0.38, ry: 0.20 },
      { number: 8,  name: 'CMF',  rx: 0.38, ry: 0.38 },
      { number: 6,  name: 'CMF',  rx: 0.38, ry: 0.62 },
      { number: 11, name: 'LMF',  rx: 0.38, ry: 0.80 },
      { number: 9,  name: 'CF',   rx: 0.58, ry: 0.38 },
      { number: 10, name: 'CF',   rx: 0.58, ry: 0.62 },
    ],
    opponent: [
      { position: 'GK',  rx: 0.95, ry: 0.50 },
      { position: 'RB',  rx: 0.82, ry: 0.20 },
      { position: 'CB',  rx: 0.82, ry: 0.38 },
      { position: 'CB',  rx: 0.82, ry: 0.62 },
      { position: 'LB',  rx: 0.82, ry: 0.80 },
      { position: 'RMF', rx: 0.62, ry: 0.20 },
      { position: 'CMF', rx: 0.62, ry: 0.38 },
      { position: 'CMF', rx: 0.62, ry: 0.62 },
      { position: 'LMF', rx: 0.62, ry: 0.80 },
      { position: 'CF',  rx: 0.42, ry: 0.38 },
      { position: 'CF',  rx: 0.42, ry: 0.62 },
    ],
  },
  '4-2-3-1': {
    own: [
      { number: 1,  name: 'GK',   rx: 0.05, ry: 0.50 },
      { number: 2,  name: 'RB',   rx: 0.18, ry: 0.18 },
      { number: 5,  name: 'CB',   rx: 0.18, ry: 0.38 },
      { number: 4,  name: 'CB',   rx: 0.18, ry: 0.62 },
      { number: 3,  name: 'LB',   rx: 0.18, ry: 0.82 },
      { number: 6,  name: 'DM',   rx: 0.33, ry: 0.38 },
      { number: 8,  name: 'DM',   rx: 0.33, ry: 0.62 },
      { number: 7,  name: 'RMF',  rx: 0.48, ry: 0.18 },
      { number: 10, name: 'AMF',  rx: 0.48, ry: 0.50 },
      { number: 11, name: 'LMF',  rx: 0.48, ry: 0.82 },
      { number: 9,  name: 'CF',   rx: 0.63, ry: 0.50 },
    ],
    opponent: [
      { position: 'GK',  rx: 0.95, ry: 0.50 },
      { position: 'RWB', rx: 0.82, ry: 0.18 },
      { position: 'RCB', rx: 0.82, ry: 0.35 },
      { position: 'CB',  rx: 0.82, ry: 0.50 },
      { position: 'LCB', rx: 0.82, ry: 0.65 },
      { position: 'LWB', rx: 0.82, ry: 0.82 },
      { position: 'RDM', rx: 0.67, ry: 0.35 },
      { position: 'LDM', rx: 0.67, ry: 0.65 },
      { position: 'AMR', rx: 0.52, ry: 0.22 },
      { position: 'AML', rx: 0.52, ry: 0.78 },
      { position: 'CF',  rx: 0.37, ry: 0.50 },
    ],
  },
  '3-4-2-1': {
    own: [
      { number: 1,  name: 'GK',   rx: 0.05, ry: 0.50 },
      { number: 5,  name: 'CB',   rx: 0.18, ry: 0.30 },
      { number: 4,  name: 'CB',   rx: 0.18, ry: 0.50 },
      { number: 3,  name: 'CB',   rx: 0.18, ry: 0.70 },
      { number: 2,  name: 'RWB',  rx: 0.33, ry: 0.15 },
      { number: 6,  name: 'CMF',  rx: 0.33, ry: 0.38 },
      { number: 8,  name: 'CMF',  rx: 0.33, ry: 0.62 },
      { number: 11, name: 'LWB',  rx: 0.33, ry: 0.85 },
      { number: 7,  name: 'SS',   rx: 0.50, ry: 0.35 },
      { number: 10, name: 'SS',   rx: 0.50, ry: 0.65 },
      { number: 9,  name: 'CF',   rx: 0.63, ry: 0.50 },
    ],
    opponent: [
      { position: 'GK',  rx: 0.95, ry: 0.50 },
      { position: 'RB',  rx: 0.82, ry: 0.20 },
      { position: 'CB',  rx: 0.82, ry: 0.38 },
      { position: 'CB',  rx: 0.82, ry: 0.62 },
      { position: 'LB',  rx: 0.82, ry: 0.80 },
      { position: 'RMF', rx: 0.62, ry: 0.20 },
      { position: 'CMF', rx: 0.62, ry: 0.38 },
      { position: 'CMF', rx: 0.62, ry: 0.62 },
      { position: 'LMF', rx: 0.62, ry: 0.80 },
      { position: 'CF',  rx: 0.42, ry: 0.38 },
      { position: 'CF',  rx: 0.42, ry: 0.62 },
    ],
  },
  '4-3-3': {
    own: [
      { number: 1,  name: 'GK',   rx: 0.05, ry: 0.50 },
      { number: 2,  name: 'RB',   rx: 0.18, ry: 0.18 },
      { number: 5,  name: 'CB',   rx: 0.18, ry: 0.38 },
      { number: 4,  name: 'CB',   rx: 0.18, ry: 0.62 },
      { number: 3,  name: 'LB',   rx: 0.18, ry: 0.82 },
      { number: 6,  name: 'CMF',  rx: 0.35, ry: 0.30 },
      { number: 8,  name: 'CMF',  rx: 0.35, ry: 0.50 },
      { number: 10, name: 'CMF',  rx: 0.35, ry: 0.70 },
      { number: 7,  name: 'RWF',  rx: 0.58, ry: 0.18 },
      { number: 9,  name: 'CF',   rx: 0.58, ry: 0.50 },
      { number: 11, name: 'LWF',  rx: 0.58, ry: 0.82 },
    ],
    opponent: [
      { position: 'GK',  rx: 0.95, ry: 0.50 },
      { position: 'RB',  rx: 0.82, ry: 0.18 },
      { position: 'CB',  rx: 0.82, ry: 0.38 },
      { position: 'CB',  rx: 0.82, ry: 0.62 },
      { position: 'LB',  rx: 0.82, ry: 0.82 },
      { position: 'RMF', rx: 0.65, ry: 0.30 },
      { position: 'CMF', rx: 0.65, ry: 0.50 },
      { position: 'LMF', rx: 0.65, ry: 0.70 },
      { position: 'RWF', rx: 0.42, ry: 0.18 },
      { position: 'CF',  rx: 0.42, ry: 0.50 },
      { position: 'LWF', rx: 0.42, ry: 0.82 },
    ],
  },
};

// ===========================
// アプリ状態
// ===========================
const state = {
  markers: [],          // 全マーカー配列
  showOpponent: true,
  showName: true,
  showNumber: true,
  dragging: null,       // { marker, offsetX, offsetY }
  editTarget: null,     // 編集中マーカー
  pitchRect: { x: 0, y: 0, w: 0, h: 0 },  // キャンバス上のピッチ描画領域
};

// ===========================
// DOM要素
// ===========================
const canvas = document.getElementById('pitch-canvas');
const ctx = canvas.getContext('2d');
const modal = document.getElementById('edit-modal');
const editNumber = document.getElementById('edit-number');
const editName = document.getElementById('edit-name');
const toast = document.getElementById('toast');

// ===========================
// ユーティリティ
// ===========================
function showToast(msg, duration = 2000) {
  toast.textContent = msg;
  toast.classList.remove('hidden');
  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(() => toast.classList.add('hidden'), duration);
}

function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val));
}

// ===========================
// マーカー生成
// ===========================
function createMarkers(formationKey) {
  const f = FORMATIONS[formationKey];
  const markers = [];
  let id = 0;

  // 解説側チーム
  f.own.forEach(p => {
    markers.push({
      id: id++,
      type: 'own',
      rx: p.rx,
      ry: p.ry,
      number: p.number,
      name: p.name,
    });
  });

  // 相手チーム
  f.opponent.forEach(p => {
    markers.push({
      id: id++,
      type: 'opponent',
      rx: p.rx,
      ry: p.ry,
      position: p.position,
    });
  });

  // ボール
  markers.push({
    id: id++,
    type: 'ball',
    rx: 0.50,
    ry: 0.50,
  });

  return markers;
}

// ===========================
// キャンバスリサイズ
// ===========================
function resizeCanvas() {
  const container = document.getElementById('canvas-container');
  const cw = container.clientWidth;
  const ch = container.clientHeight;
  canvas.width = cw;
  canvas.height = ch;

  // ピッチのアスペクト比 105:68 (横長)
  const PITCH_ASPECT = 105 / 68;
  const padding = 40;
  let pw = cw - padding * 2;
  let ph = pw / PITCH_ASPECT;
  if (ph > ch - padding * 2) {
    ph = ch - padding * 2;
    pw = ph * PITCH_ASPECT;
  }
  const px = (cw - pw) / 2;
  const py = (ch - ph) / 2;
  state.pitchRect = { x: px, y: py, w: pw, h: ph };

  draw();
}

// ===========================
// ピッチ描画
// ===========================
function drawPitch() {
  const { x, y, w, h } = state.pitchRect;

  // 芝背景
  const grassGrad = ctx.createLinearGradient(x, y, x + w, y + h);
  grassGrad.addColorStop(0, '#2d8a3e');
  grassGrad.addColorStop(0.5, '#34a048');
  grassGrad.addColorStop(1, '#2d8a3e');
  ctx.fillStyle = grassGrad;
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, 6);
  ctx.fill();

  // 芝縞模様
  ctx.save();
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, 6);
  ctx.clip();
  const stripeW = w / 10;
  for (let i = 0; i < 10; i++) {
    if (i % 2 === 0) {
      ctx.fillStyle = 'rgba(0,0,0,0.04)';
      ctx.fillRect(x + i * stripeW, y, stripeW, h);
    }
  }
  ctx.restore();

  // ライン設定
  ctx.strokeStyle = 'rgba(255,255,255,0.85)';
  ctx.lineWidth = Math.max(1.5, w / 350);

  // タッチライン（外枠）
  ctx.strokeRect(x, y, w, h);

  // センターライン
  ctx.beginPath();
  ctx.moveTo(x + w / 2, y);
  ctx.lineTo(x + w / 2, y + h);
  ctx.stroke();

  // センターサークル
  const cr = h * 0.146; // 半径 9.15m / 68m
  ctx.beginPath();
  ctx.arc(x + w / 2, y + h / 2, cr, 0, Math.PI * 2);
  ctx.stroke();

  // センタースポット
  ctx.fillStyle = 'rgba(255,255,255,0.85)';
  ctx.beginPath();
  ctx.arc(x + w / 2, y + h / 2, 3, 0, Math.PI * 2);
  ctx.fill();

  // ペナルティエリア（左）
  const paW = w * (16.5 / 105);
  const paH = h * (40.32 / 68);
  const paY = y + (h - paH) / 2;
  ctx.strokeRect(x, paY, paW, paH);

  // ゴールエリア（左）
  const gaW = w * (5.5 / 105);
  const gaH = h * (18.32 / 68);
  const gaY = y + (h - gaH) / 2;
  ctx.strokeRect(x, gaY, gaW, gaH);

  // ペナルティエリア（右）
  ctx.strokeRect(x + w - paW, paY, paW, paH);

  // ゴールエリア（右）
  ctx.strokeRect(x + w - gaW, gaY, gaW, gaH);

  // ゴール（左）
  const goalH = h * (7.32 / 68);
  const goalW = w * (2.44 / 105);
  const goalY = y + (h - goalH) / 2;
  ctx.strokeStyle = 'rgba(255,255,255,0.6)';
  ctx.strokeRect(x - goalW, goalY, goalW, goalH);

  // ゴール（右）
  ctx.strokeRect(x + w, goalY, goalW, goalH);

  // ペナルティスポット（左）
  ctx.fillStyle = 'rgba(255,255,255,0.85)';
  ctx.strokeStyle = 'rgba(255,255,255,0.85)';
  ctx.lineWidth = Math.max(1.5, w / 350);
  const psX_l = x + w * (11 / 105);
  ctx.beginPath();
  ctx.arc(psX_l, y + h / 2, 3, 0, Math.PI * 2);
  ctx.fill();

  // ペナルティスポット（右）
  const psX_r = x + w * (94 / 105);
  ctx.beginPath();
  ctx.arc(psX_r, y + h / 2, 3, 0, Math.PI * 2);
  ctx.fill();

  // ペナルティアーク（左）
  const arcR = h * (9.15 / 68);
  ctx.beginPath();
  ctx.arc(psX_l, y + h / 2, arcR, -Math.PI * 0.28, Math.PI * 0.28);
  ctx.stroke();

  // ペナルティアーク（右）
  ctx.beginPath();
  ctx.arc(psX_r, y + h / 2, arcR, Math.PI - Math.PI * 0.28, Math.PI + Math.PI * 0.28);
  ctx.stroke();

  // コーナーアーク
  const cornerR = h * (1 / 68);
  const corners = [
    { cx: x, cy: y, sa: 0, ea: Math.PI / 2 },
    { cx: x + w, cy: y, sa: Math.PI / 2, ea: Math.PI },
    { cx: x + w, cy: y + h, sa: Math.PI, ea: Math.PI * 1.5 },
    { cx: x, cy: y + h, sa: Math.PI * 1.5, ea: Math.PI * 2 },
  ];
  corners.forEach(c => {
    ctx.beginPath();
    ctx.arc(c.cx, c.cy, cornerR, c.sa, c.ea);
    ctx.stroke();
  });
}

// ===========================
// マーカー描画
// ===========================
function markerToCanvas(marker) {
  const { x, y, w, h } = state.pitchRect;
  return {
    cx: x + marker.rx * w,
    cy: y + marker.ry * h,
  };
}

function drawMarker(marker) {
  if (marker.type === 'opponent' && !state.showOpponent) return;

  const { cx, cy } = markerToCanvas(marker);
  const r = Math.max(16, state.pitchRect.w / 38);

  if (marker.type === 'ball') {
    drawBall(cx, cy, r * 0.75);
    return;
  }

  if (marker.type === 'own') {
    // 白丸
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.strokeStyle = '#1a1a2e';
    ctx.lineWidth = 2;
    ctx.stroke();

    // 背番号
    if (state.showNumber) {
      ctx.fillStyle = '#1a1a2e';
      ctx.font = `bold ${Math.round(r * 0.85)}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(String(marker.number), cx, cy);
    }

    // 名前
    if (state.showName && marker.name) {
      ctx.fillStyle = '#ffffff';
      ctx.font = `bold ${Math.round(r * 0.62)}px 'Hiragino Kaku Gothic ProN','Hiragino Sans','Meiryo',sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.fillText(marker.name, cx, cy + r + 3);
    }
  }

  if (marker.type === 'opponent') {
    // 濃い緑丸
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(15, 80, 30, 0.88)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(100, 200, 100, 0.7)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // ポジション名
    ctx.fillStyle = '#d4ffd4';
    const fontSize = marker.position.length > 3
      ? Math.round(r * 0.55)
      : Math.round(r * 0.65);
    ctx.font = `bold ${fontSize}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(marker.position, cx, cy);
  }
}

function drawBall(cx, cy, r) {
  // 白ベース
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fillStyle = '#f5f5f5';
  ctx.fill();
  ctx.strokeStyle = '#333';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // 黒パネル（簡易サッカーボール風）
  ctx.fillStyle = '#222';
  // 中央五角形風
  const panels = [
    [0, -r * 0.42],
    [r * 0.40, -r * 0.13],
    [r * 0.25, r * 0.35],
    [-r * 0.25, r * 0.35],
    [-r * 0.40, -r * 0.13],
  ];
  ctx.beginPath();
  panels.forEach((p, i) => {
    const px = cx + p[0];
    const py = cy + p[1];
    i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
  });
  ctx.closePath();
  ctx.fill();

  // 外縁の小パネル（6方向）
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2 - Math.PI / 6;
    const px = cx + Math.cos(angle) * r * 0.72;
    const py = cy + Math.sin(angle) * r * 0.72;
    ctx.beginPath();
    ctx.arc(px, py, r * 0.18, 0, Math.PI * 2);
    ctx.fill();
  }
}

// ===========================
// メイン描画
// ===========================
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 背景
  ctx.fillStyle = '#1a1a2e';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  drawPitch();

  // マーカー描画（ボールを最後に）
  const balls = [];
  state.markers.forEach(m => {
    if (m.type === 'ball') balls.push(m);
    else drawMarker(m);
  });
  balls.forEach(m => drawMarker(m));
}

// ===========================
// ヒットテスト
// ===========================
function hitTest(mx, my) {
  const { x, y, w, h } = state.pitchRect;
  const r = Math.max(16, w / 38);

  // 逆順でテスト（上に描画されたものを優先）
  for (let i = state.markers.length - 1; i >= 0; i--) {
    const m = state.markers[i];
    if (m.type === 'opponent' && !state.showOpponent) continue;

    const { cx, cy } = markerToCanvas(m);
    const hitR = m.type === 'ball' ? r * 0.75 : r;
    const dx = mx - cx;
    const dy = my - cy;
    if (dx * dx + dy * dy <= hitR * hitR) {
      return m;
    }
  }
  return null;
}

// ===========================
// ドラッグ処理
// ===========================
function getCanvasPos(e) {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  const clientX = e.touches ? e.touches[0].clientX : e.clientX;
  const clientY = e.touches ? e.touches[0].clientY : e.clientY;
  return {
    x: (clientX - rect.left) * scaleX,
    y: (clientY - rect.top) * scaleY,
  };
}

canvas.addEventListener('mousedown', onPointerDown);
canvas.addEventListener('touchstart', onPointerDown, { passive: false });

function onPointerDown(e) {
  e.preventDefault();
  const pos = getCanvasPos(e);
  const hit = hitTest(pos.x, pos.y);
  if (!hit) return;

  const { cx, cy } = markerToCanvas(hit);
  state.dragging = {
    marker: hit,
    offsetX: pos.x - cx,
    offsetY: pos.y - cy,
  };
  canvas.style.cursor = 'grabbing';
}

window.addEventListener('mousemove', onPointerMove);
window.addEventListener('touchmove', onPointerMove, { passive: false });

function onPointerMove(e) {
  if (!state.dragging) return;
  e.preventDefault();
  const pos = getCanvasPos(e);
  const { x, y, w, h } = state.pitchRect;
  const m = state.dragging.marker;

  // ピッチ内に収める
  const newCX = clamp(pos.x - state.dragging.offsetX, x, x + w);
  const newCY = clamp(pos.y - state.dragging.offsetY, y, y + h);

  m.rx = (newCX - x) / w;
  m.ry = (newCY - y) / h;
  draw();
}

window.addEventListener('mouseup', onPointerUp);
window.addEventListener('touchend', onPointerUp);

function onPointerUp() {
  state.dragging = null;
  canvas.style.cursor = 'default';
}

// ===========================
// ダブルクリックで編集
// ===========================
canvas.addEventListener('dblclick', e => {
  const pos = getCanvasPos(e);
  const hit = hitTest(pos.x, pos.y);
  if (!hit || hit.type !== 'own') return;

  state.editTarget = hit;
  editNumber.value = hit.number;
  editName.value = hit.name;
  modal.classList.remove('hidden');
  editName.focus();
});

document.getElementById('edit-ok').addEventListener('click', () => {
  if (!state.editTarget) return;
  const num = parseInt(editNumber.value, 10);
  state.editTarget.number = isNaN(num) ? state.editTarget.number : clamp(num, 1, 99);
  state.editTarget.name = editName.value.trim() || state.editTarget.name;
  state.editTarget = null;
  modal.classList.add('hidden');
  draw();
});

document.getElementById('edit-cancel').addEventListener('click', () => {
  state.editTarget = null;
  modal.classList.add('hidden');
});

// Enterキーで確定
editName.addEventListener('keydown', e => {
  if (e.key === 'Enter') document.getElementById('edit-ok').click();
  if (e.key === 'Escape') document.getElementById('edit-cancel').click();
});
editNumber.addEventListener('keydown', e => {
  if (e.key === 'Enter') editName.focus();
});

// ===========================
// フォーメーション切替
// ===========================
document.getElementById('formation-select').addEventListener('change', e => {
  const key = e.target.value;
  // 解説側の名前・番号を保持しつつ位置だけリセット
  const f = FORMATIONS[key];
  const ownMarkers = state.markers.filter(m => m.type === 'own');
  const opponentMarkers = state.markers.filter(m => m.type === 'opponent');
  const ballMarker = state.markers.find(m => m.type === 'ball');

  f.own.forEach((p, i) => {
    if (ownMarkers[i]) {
      ownMarkers[i].rx = p.rx;
      ownMarkers[i].ry = p.ry;
    }
  });
  f.opponent.forEach((p, i) => {
    if (opponentMarkers[i]) {
      opponentMarkers[i].rx = p.rx;
      opponentMarkers[i].ry = p.ry;
      opponentMarkers[i].position = p.position;
    }
  });
  if (ballMarker) {
    ballMarker.rx = 0.50;
    ballMarker.ry = 0.50;
  }
  draw();
  showToast(`フォーメーション: ${key}`);
});

// ===========================
// リセット
// ===========================
document.getElementById('btn-reset').addEventListener('click', () => {
  const key = document.getElementById('formation-select').value;
  state.markers = createMarkers(key);
  draw();
  showToast('初期配置にリセットしました');
});

// ===========================
// 表示切替
// ===========================
document.getElementById('toggle-opponent').addEventListener('change', e => {
  state.showOpponent = e.target.checked;
  draw();
});
document.getElementById('toggle-name').addEventListener('change', e => {
  state.showName = e.target.checked;
  draw();
});
document.getElementById('toggle-number').addEventListener('change', e => {
  state.showNumber = e.target.checked;
  draw();
});

// ===========================
// 保存・読込（ローカルストレージ）
// ===========================
const STORAGE_KEY = 'soccer_tactics_board_v1';

document.getElementById('btn-save').addEventListener('click', () => {
  const data = {
    formation: document.getElementById('formation-select').value,
    markers: state.markers.map(m => ({ ...m })),
    showOpponent: state.showOpponent,
    showName: state.showName,
    showNumber: state.showNumber,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  showToast('配置を保存しました');
});

document.getElementById('btn-load').addEventListener('click', () => {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    showToast('保存データが見つかりません');
    return;
  }
  try {
    const data = JSON.parse(raw);
    state.markers = data.markers;
    state.showOpponent = data.showOpponent ?? true;
    state.showName = data.showName ?? true;
    state.showNumber = data.showNumber ?? true;

    document.getElementById('toggle-opponent').checked = state.showOpponent;
    document.getElementById('toggle-name').checked = state.showName;
    document.getElementById('toggle-number').checked = state.showNumber;
    if (data.formation) {
      document.getElementById('formation-select').value = data.formation;
    }
    draw();
    showToast('配置を読み込みました');
  } catch {
    showToast('読込に失敗しました');
  }
});

// ===========================
// PNG書き出し
// ===========================
document.getElementById('btn-png').addEventListener('click', () => {
  // コントロールパネルを隠してキャプチャ
  const panel = document.getElementById('control-panel');
  panel.style.visibility = 'hidden';

  // ピッチ部分だけ切り出し
  const { x, y, w, h } = state.pitchRect;
  const margin = 20;
  const tmpCanvas = document.createElement('canvas');
  tmpCanvas.width = w + margin * 2;
  tmpCanvas.height = h + margin * 2;
  const tmpCtx = tmpCanvas.getContext('2d');
  tmpCtx.drawImage(canvas, x - margin, y - margin, w + margin * 2, h + margin * 2, 0, 0, w + margin * 2, h + margin * 2);

  panel.style.visibility = '';

  const link = document.createElement('a');
  link.download = `tactics_${Date.now()}.png`;
  link.href = tmpCanvas.toDataURL('image/png');
  link.click();
  showToast('PNG画像を保存しました');
});

// ===========================
// 全画面
// ===========================
document.getElementById('btn-fullscreen').addEventListener('click', () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(() => {});
  } else {
    document.exitFullscreen();
  }
});

document.addEventListener('fullscreenchange', () => {
  setTimeout(resizeCanvas, 100);
});

// ===========================
// 初期化
// ===========================
function init() {
  state.markers = createMarkers('4-2-3-1');
  resizeCanvas();
}

window.addEventListener('resize', resizeCanvas);
init();
