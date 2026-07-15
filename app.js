/**
 * サッカー戦術ボード - メインスクリプト
 * 自チーム・相手チームのフォーメーションを独立して変更可能
 * 自チーム選手に画像（顔写真）を設定可能
 * 控えメンバー7人分のベンチエリアを追加
 */

'use strict';

// ===========================
// フォーメーション定義（自チーム用）
// ===========================
const OWN_FORMATIONS = {
  '4-4-2': [
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
  '4-2-3-1': [
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
  '3-4-2-1': [
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
  '4-3-3': [
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
  '3-5-2': [
    { number: 1,  name: 'GK',   rx: 0.05, ry: 0.50 },
    { number: 5,  name: 'CB',   rx: 0.18, ry: 0.28 },
    { number: 4,  name: 'CB',   rx: 0.18, ry: 0.50 },
    { number: 3,  name: 'CB',   rx: 0.18, ry: 0.72 },
    { number: 2,  name: 'RWB',  rx: 0.35, ry: 0.12 },
    { number: 6,  name: 'CMF',  rx: 0.35, ry: 0.32 },
    { number: 8,  name: 'CMF',  rx: 0.35, ry: 0.50 },
    { number: 10, name: 'CMF',  rx: 0.35, ry: 0.68 },
    { number: 11, name: 'LWB',  rx: 0.35, ry: 0.88 },
    { number: 9,  name: 'CF',   rx: 0.58, ry: 0.38 },
    { number: 7,  name: 'CF',   rx: 0.58, ry: 0.62 },
  ],
  '5-3-2': [
    { number: 1,  name: 'GK',   rx: 0.05, ry: 0.50 },
    { number: 2,  name: 'RWB',  rx: 0.20, ry: 0.12 },
    { number: 5,  name: 'CB',   rx: 0.20, ry: 0.30 },
    { number: 4,  name: 'CB',   rx: 0.20, ry: 0.50 },
    { number: 3,  name: 'CB',   rx: 0.20, ry: 0.70 },
    { number: 11, name: 'LWB',  rx: 0.20, ry: 0.88 },
    { number: 6,  name: 'CMF',  rx: 0.38, ry: 0.30 },
    { number: 8,  name: 'CMF',  rx: 0.38, ry: 0.50 },
    { number: 10, name: 'CMF',  rx: 0.38, ry: 0.70 },
    { number: 9,  name: 'CF',   rx: 0.58, ry: 0.38 },
    { number: 7,  name: 'CF',   rx: 0.58, ry: 0.62 },
  ],
  // 追加フォーメーション
  '4-1-4-1': [
    { number: 1,  name: 'GK',   rx: 0.05, ry: 0.50 },
    { number: 2,  name: 'RB',   rx: 0.18, ry: 0.18 },
    { number: 5,  name: 'CB',   rx: 0.18, ry: 0.38 },
    { number: 4,  name: 'CB',   rx: 0.18, ry: 0.62 },
    { number: 3,  name: 'LB',   rx: 0.18, ry: 0.82 },
    { number: 6,  name: 'DM',   rx: 0.30, ry: 0.50 },
    { number: 7,  name: 'RMF',  rx: 0.43, ry: 0.18 },
    { number: 8,  name: 'CMF',  rx: 0.43, ry: 0.38 },
    { number: 10, name: 'CMF',  rx: 0.43, ry: 0.62 },
    { number: 11, name: 'LMF',  rx: 0.43, ry: 0.82 },
    { number: 9,  name: 'CF',   rx: 0.63, ry: 0.50 },
  ],
  '4-4-1-1': [
    { number: 1,  name: 'GK',   rx: 0.05, ry: 0.50 },
    { number: 2,  name: 'RB',   rx: 0.18, ry: 0.18 },
    { number: 5,  name: 'CB',   rx: 0.18, ry: 0.38 },
    { number: 4,  name: 'CB',   rx: 0.18, ry: 0.62 },
    { number: 3,  name: 'LB',   rx: 0.18, ry: 0.82 },
    { number: 7,  name: 'RMF',  rx: 0.36, ry: 0.18 },
    { number: 8,  name: 'CMF',  rx: 0.36, ry: 0.38 },
    { number: 6,  name: 'CMF',  rx: 0.36, ry: 0.62 },
    { number: 11, name: 'LMF',  rx: 0.36, ry: 0.82 },
    { number: 10, name: 'SS',   rx: 0.53, ry: 0.50 },
    { number: 9,  name: 'CF',   rx: 0.65, ry: 0.50 },
  ],
  '4-1-2-1-2': [
    { number: 1,  name: 'GK',   rx: 0.05, ry: 0.50 },
    { number: 2,  name: 'RB',   rx: 0.18, ry: 0.18 },
    { number: 5,  name: 'CB',   rx: 0.18, ry: 0.38 },
    { number: 4,  name: 'CB',   rx: 0.18, ry: 0.62 },
    { number: 3,  name: 'LB',   rx: 0.18, ry: 0.82 },
    { number: 6,  name: 'DM',   rx: 0.30, ry: 0.50 },
    { number: 8,  name: 'CMF',  rx: 0.42, ry: 0.32 },
    { number: 7,  name: 'CMF',  rx: 0.42, ry: 0.68 },
    { number: 10, name: 'AMF',  rx: 0.54, ry: 0.50 },
    { number: 9,  name: 'CF',   rx: 0.65, ry: 0.32 },
    { number: 11, name: 'CF',   rx: 0.65, ry: 0.68 },
  ],
  '4-3-1-2': [
    { number: 1,  name: 'GK',   rx: 0.05, ry: 0.50 },
    { number: 2,  name: 'RB',   rx: 0.18, ry: 0.18 },
    { number: 5,  name: 'CB',   rx: 0.18, ry: 0.38 },
    { number: 4,  name: 'CB',   rx: 0.18, ry: 0.62 },
    { number: 3,  name: 'LB',   rx: 0.18, ry: 0.82 },
    { number: 6,  name: 'CMF',  rx: 0.33, ry: 0.28 },
    { number: 8,  name: 'CMF',  rx: 0.33, ry: 0.50 },
    { number: 7,  name: 'CMF',  rx: 0.33, ry: 0.72 },
    { number: 10, name: 'AMF',  rx: 0.48, ry: 0.50 },
    { number: 9,  name: 'CF',   rx: 0.63, ry: 0.35 },
    { number: 11, name: 'CF',   rx: 0.63, ry: 0.65 },
  ],
  '4-5-1': [
    { number: 1,  name: 'GK',   rx: 0.05, ry: 0.50 },
    { number: 2,  name: 'RB',   rx: 0.18, ry: 0.18 },
    { number: 5,  name: 'CB',   rx: 0.18, ry: 0.38 },
    { number: 4,  name: 'CB',   rx: 0.18, ry: 0.62 },
    { number: 3,  name: 'LB',   rx: 0.18, ry: 0.82 },
    { number: 7,  name: 'RMF',  rx: 0.38, ry: 0.12 },
    { number: 6,  name: 'CMF',  rx: 0.38, ry: 0.30 },
    { number: 8,  name: 'CMF',  rx: 0.38, ry: 0.50 },
    { number: 10, name: 'CMF',  rx: 0.38, ry: 0.70 },
    { number: 11, name: 'LMF',  rx: 0.38, ry: 0.88 },
    { number: 9,  name: 'CF',   rx: 0.60, ry: 0.50 },
  ],
  '3-3-3-1': [
    { number: 1,  name: 'GK',   rx: 0.05, ry: 0.50 },
    { number: 5,  name: 'CB',   rx: 0.18, ry: 0.28 },
    { number: 4,  name: 'CB',   rx: 0.18, ry: 0.50 },
    { number: 3,  name: 'CB',   rx: 0.18, ry: 0.72 },
    { number: 2,  name: 'RMF',  rx: 0.33, ry: 0.22 },
    { number: 6,  name: 'CMF',  rx: 0.33, ry: 0.50 },
    { number: 11, name: 'LMF',  rx: 0.33, ry: 0.78 },
    { number: 7,  name: 'RWF',  rx: 0.50, ry: 0.22 },
    { number: 10, name: 'AMF',  rx: 0.50, ry: 0.50 },
    { number: 8,  name: 'LWF',  rx: 0.50, ry: 0.78 },
    { number: 9,  name: 'CF',   rx: 0.65, ry: 0.50 },
  ],
  '3-4-3': [
    { number: 1,  name: 'GK',   rx: 0.05, ry: 0.50 },
    { number: 5,  name: 'CB',   rx: 0.18, ry: 0.28 },
    { number: 4,  name: 'CB',   rx: 0.18, ry: 0.50 },
    { number: 3,  name: 'CB',   rx: 0.18, ry: 0.72 },
    { number: 2,  name: 'RWB',  rx: 0.35, ry: 0.15 },
    { number: 6,  name: 'CMF',  rx: 0.35, ry: 0.38 },
    { number: 8,  name: 'CMF',  rx: 0.35, ry: 0.62 },
    { number: 11, name: 'LWB',  rx: 0.35, ry: 0.85 },
    { number: 7,  name: 'RWF',  rx: 0.58, ry: 0.20 },
    { number: 9,  name: 'CF',   rx: 0.58, ry: 0.50 },
    { number: 10, name: 'LWF',  rx: 0.58, ry: 0.80 },
  ],
  '4-2-2-2': [
    { number: 1,  name: 'GK',   rx: 0.05, ry: 0.50 },
    { number: 2,  name: 'RB',   rx: 0.18, ry: 0.18 },
    { number: 5,  name: 'CB',   rx: 0.18, ry: 0.38 },
    { number: 4,  name: 'CB',   rx: 0.18, ry: 0.62 },
    { number: 3,  name: 'LB',   rx: 0.18, ry: 0.82 },
    { number: 6,  name: 'DM',   rx: 0.32, ry: 0.38 },
    { number: 8,  name: 'DM',   rx: 0.32, ry: 0.62 },
    { number: 7,  name: 'AMR',  rx: 0.48, ry: 0.25 },
    { number: 10, name: 'AML',  rx: 0.48, ry: 0.75 },
    { number: 9,  name: 'CF',   rx: 0.63, ry: 0.35 },
    { number: 11, name: 'CF',   rx: 0.63, ry: 0.65 },
  ],
};

// ===========================
// フォーメーション定義（相手チーム用）
// ===========================
const OPP_FORMATIONS = {
  '4-4-2': [
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
  '4-2-3-1': [
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
  '3-4-2-1': [
    { position: 'GK',  rx: 0.95, ry: 0.50 },
    { position: 'RCB', rx: 0.82, ry: 0.28 },
    { position: 'CB',  rx: 0.82, ry: 0.50 },
    { position: 'LCB', rx: 0.82, ry: 0.72 },
    { position: 'RWB', rx: 0.67, ry: 0.12 },
    { position: 'RMF', rx: 0.67, ry: 0.35 },
    { position: 'LMF', rx: 0.67, ry: 0.65 },
    { position: 'LWB', rx: 0.67, ry: 0.88 },
    { position: 'SS',  rx: 0.50, ry: 0.35 },
    { position: 'SS',  rx: 0.50, ry: 0.65 },
    { position: 'CF',  rx: 0.37, ry: 0.50 },
  ],
  '4-3-3': [
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
  '3-5-2': [
    { position: 'GK',  rx: 0.95, ry: 0.50 },
    { position: 'RCB', rx: 0.82, ry: 0.28 },
    { position: 'CB',  rx: 0.82, ry: 0.50 },
    { position: 'LCB', rx: 0.82, ry: 0.72 },
    { position: 'RWB', rx: 0.65, ry: 0.12 },
    { position: 'RMF', rx: 0.65, ry: 0.32 },
    { position: 'CMF', rx: 0.65, ry: 0.50 },
    { position: 'LMF', rx: 0.65, ry: 0.68 },
    { position: 'LWB', rx: 0.65, ry: 0.88 },
    { position: 'CF',  rx: 0.42, ry: 0.38 },
    { position: 'CF',  rx: 0.42, ry: 0.62 },
  ],
  '5-3-2': [
    { position: 'GK',  rx: 0.95, ry: 0.50 },
    { position: 'RWB', rx: 0.80, ry: 0.12 },
    { position: 'RCB', rx: 0.80, ry: 0.30 },
    { position: 'CB',  rx: 0.80, ry: 0.50 },
    { position: 'LCB', rx: 0.80, ry: 0.70 },
    { position: 'LWB', rx: 0.80, ry: 0.88 },
    { position: 'RMF', rx: 0.62, ry: 0.30 },
    { position: 'CMF', rx: 0.62, ry: 0.50 },
    { position: 'LMF', rx: 0.62, ry: 0.70 },
    { position: 'CF',  rx: 0.42, ry: 0.38 },
    { position: 'CF',  rx: 0.42, ry: 0.62 },
  ],
  // 追加フォーメーション
  '4-1-4-1': [
    { position: 'GK',  rx: 0.95, ry: 0.50 },
    { position: 'RB',  rx: 0.82, ry: 0.18 },
    { position: 'CB',  rx: 0.82, ry: 0.38 },
    { position: 'CB',  rx: 0.82, ry: 0.62 },
    { position: 'LB',  rx: 0.82, ry: 0.82 },
    { position: 'DM',  rx: 0.70, ry: 0.50 },
    { position: 'RMF', rx: 0.57, ry: 0.18 },
    { position: 'CMF', rx: 0.57, ry: 0.38 },
    { position: 'CMF', rx: 0.57, ry: 0.62 },
    { position: 'LMF', rx: 0.57, ry: 0.82 },
    { position: 'CF',  rx: 0.37, ry: 0.50 },
  ],
  '4-4-1-1': [
    { position: 'GK',  rx: 0.95, ry: 0.50 },
    { position: 'RB',  rx: 0.82, ry: 0.18 },
    { position: 'CB',  rx: 0.82, ry: 0.38 },
    { position: 'CB',  rx: 0.82, ry: 0.62 },
    { position: 'LB',  rx: 0.82, ry: 0.82 },
    { position: 'RMF', rx: 0.64, ry: 0.18 },
    { position: 'CMF', rx: 0.64, ry: 0.38 },
    { position: 'CMF', rx: 0.64, ry: 0.62 },
    { position: 'LMF', rx: 0.64, ry: 0.82 },
    { position: 'SS',  rx: 0.47, ry: 0.50 },
    { position: 'CF',  rx: 0.35, ry: 0.50 },
  ],
  '4-1-2-1-2': [
    { position: 'GK',  rx: 0.95, ry: 0.50 },
    { position: 'RB',  rx: 0.82, ry: 0.18 },
    { position: 'CB',  rx: 0.82, ry: 0.38 },
    { position: 'CB',  rx: 0.82, ry: 0.62 },
    { position: 'LB',  rx: 0.82, ry: 0.82 },
    { position: 'DM',  rx: 0.70, ry: 0.50 },
    { position: 'CMF', rx: 0.58, ry: 0.32 },
    { position: 'CMF', rx: 0.58, ry: 0.68 },
    { position: 'AMF', rx: 0.46, ry: 0.50 },
    { position: 'CF',  rx: 0.35, ry: 0.32 },
    { position: 'CF',  rx: 0.35, ry: 0.68 },
  ],
  '4-3-1-2': [
    { position: 'GK',  rx: 0.95, ry: 0.50 },
    { position: 'RB',  rx: 0.82, ry: 0.18 },
    { position: 'CB',  rx: 0.82, ry: 0.38 },
    { position: 'CB',  rx: 0.82, ry: 0.62 },
    { position: 'LB',  rx: 0.82, ry: 0.82 },
    { position: 'CMF', rx: 0.67, ry: 0.28 },
    { position: 'CMF', rx: 0.67, ry: 0.50 },
    { position: 'CMF', rx: 0.67, ry: 0.72 },
    { position: 'AMF', rx: 0.52, ry: 0.50 },
    { position: 'CF',  rx: 0.37, ry: 0.35 },
    { position: 'CF',  rx: 0.37, ry: 0.65 },
  ],
  '4-5-1': [
    { position: 'GK',  rx: 0.95, ry: 0.50 },
    { position: 'RB',  rx: 0.82, ry: 0.18 },
    { position: 'CB',  rx: 0.82, ry: 0.38 },
    { position: 'CB',  rx: 0.82, ry: 0.62 },
    { position: 'LB',  rx: 0.82, ry: 0.82 },
    { position: 'RMF', rx: 0.62, ry: 0.12 },
    { position: 'CMF', rx: 0.62, ry: 0.30 },
    { position: 'CMF', rx: 0.62, ry: 0.50 },
    { position: 'CMF', rx: 0.62, ry: 0.70 },
    { position: 'LMF', rx: 0.62, ry: 0.88 },
    { position: 'CF',  rx: 0.40, ry: 0.50 },
  ],
  '3-3-3-1': [
    { position: 'GK',  rx: 0.95, ry: 0.50 },
    { position: 'RCB', rx: 0.82, ry: 0.28 },
    { position: 'CB',  rx: 0.82, ry: 0.50 },
    { position: 'LCB', rx: 0.82, ry: 0.72 },
    { position: 'RMF', rx: 0.67, ry: 0.22 },
    { position: 'CMF', rx: 0.67, ry: 0.50 },
    { position: 'LMF', rx: 0.67, ry: 0.78 },
    { position: 'RWF', rx: 0.50, ry: 0.22 },
    { position: 'AMF', rx: 0.50, ry: 0.50 },
    { position: 'LWF', rx: 0.50, ry: 0.78 },
    { position: 'CF',  rx: 0.35, ry: 0.50 },
  ],
  '3-4-3': [
    { position: 'GK',  rx: 0.95, ry: 0.50 },
    { position: 'RCB', rx: 0.82, ry: 0.28 },
    { position: 'CB',  rx: 0.82, ry: 0.50 },
    { position: 'LCB', rx: 0.82, ry: 0.72 },
    { position: 'RWB', rx: 0.65, ry: 0.15 },
    { position: 'CMF', rx: 0.65, ry: 0.38 },
    { position: 'CMF', rx: 0.65, ry: 0.62 },
    { position: 'LWB', rx: 0.65, ry: 0.85 },
    { position: 'RWF', rx: 0.42, ry: 0.20 },
    { position: 'CF',  rx: 0.42, ry: 0.50 },
    { position: 'LWF', rx: 0.42, ry: 0.80 },
  ],
  '4-2-2-2': [
    { position: 'GK',  rx: 0.95, ry: 0.50 },
    { position: 'RB',  rx: 0.82, ry: 0.18 },
    { position: 'CB',  rx: 0.82, ry: 0.38 },
    { position: 'CB',  rx: 0.82, ry: 0.62 },
    { position: 'LB',  rx: 0.82, ry: 0.82 },
    { position: 'DM',  rx: 0.68, ry: 0.38 },
    { position: 'DM',  rx: 0.68, ry: 0.62 },
    { position: 'AMR', rx: 0.52, ry: 0.25 },
    { position: 'AML', rx: 0.52, ry: 0.75 },
    { position: 'CF',  rx: 0.37, ry: 0.35 },
    { position: 'CF',  rx: 0.37, ry: 0.65 },
  ],
};

// ===========================
// 控えメンバーのデフォルト（7人）
// ===========================
const BENCH_DEFAULTS = [
  { number: 12, name: 'GK' },
  { number: 13, name: 'DF' },
  { number: 14, name: 'DF' },
  { number: 15, name: 'MF' },
  { number: 16, name: 'MF' },
  { number: 17, name: 'FW' },
  { number: 18, name: 'FW' },
];

// ===========================
// 画像キャッシュ（dataURL → HTMLImageElement）
// ===========================
const imgCache = new Map();

function getImage(dataUrl) {
  if (!dataUrl) return null;
  if (imgCache.has(dataUrl)) return imgCache.get(dataUrl);
  const img = new Image();
  img.src = dataUrl;
  img.onload = () => draw();
  imgCache.set(dataUrl, img);
  return img;
}

// ===========================
// アプリ状態
// ===========================
const state = {
  markers: [],       // ピッチ上のマーカー（own / opponent / ball）
  bench: [],         // 控えメンバー（bench 型）
  showOpponent: true,
  showName: true,
  showNumber: true,
  dragging: null,
  editTarget: null,
  pitchRect: { x: 0, y: 0, w: 0, h: 0 },
  benchRect: { x: 0, y: 0, w: 0, h: 0 },
  currentOwnFormation: '4-2-3-1',
  currentOppFormation: '4-2-3-1',
  orientation: 'landscape', // 'landscape' | 'portrait'
  sidesFlipped: false,      // true = 自チームが右側
};

// ===========================
// DOM要素
// ===========================
const canvas = document.getElementById('pitch-canvas');
const ctx = canvas.getContext('2d');
const modal = document.getElementById('edit-modal');
const editNumber = document.getElementById('edit-number');
const editName = document.getElementById('edit-name');
const editImageInput = document.getElementById('edit-image-input');
const imgPreviewWrap = document.getElementById('img-preview-wrap');
const imgPreviewCanvas = document.getElementById('img-preview-canvas');
const imgPreviewCtx = imgPreviewCanvas.getContext('2d');
const toast = document.getElementById('toast');

// ===========================
// ユーティリティ
// ===========================
function showToast(msg, duration = 2200) {
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
function createOwnMarkers(formationKey, keepData) {
  const template = OWN_FORMATIONS[formationKey];
  return template.map((p, i) => {
    const existing = keepData && keepData[i];
    return {
      id: `own_${i}`,
      type: 'own',
      rx: p.rx,
      ry: p.ry,
      number: existing ? existing.number : p.number,
      name:   existing ? existing.name   : p.name,
      imageDataUrl: existing ? (existing.imageDataUrl || null) : null,
    };
  });
}

function createOppMarkers(formationKey) {
  const template = OPP_FORMATIONS[formationKey];
  return template.map((p, i) => ({
    id: `opp_${i}`,
    type: 'opponent',
    rx: p.rx,
    ry: p.ry,
    position: p.position,
  }));
}

function createBallMarker() {
  return { id: 'ball', type: 'ball', rx: 0.50, ry: 0.50 };
}

function createBenchMarkers(keepData) {
  return BENCH_DEFAULTS.map((p, i) => {
    const existing = keepData && keepData[i];
    return {
      id: `bench_${i}`,
      type: 'bench',
      slotIndex: i,
      number: existing ? existing.number : p.number,
      name:   existing ? existing.name   : p.name,
      imageDataUrl: existing ? (existing.imageDataUrl || null) : null,
    };
  });
}

function buildMarkers(ownKey, oppKey, keepOwnData) {
  return [
    ...createOwnMarkers(ownKey, keepOwnData),
    ...createOppMarkers(oppKey),
    createBallMarker(),
  ];
}

// ===========================
// キャンバスリサイズ
// ===========================
// ベンチエリアの高さ（マーカー直径 + 余白）
const BENCH_SLOT_COUNT = 7;

function resizeCanvas() {
  const container = document.getElementById('canvas-container');
  const cw = container.clientWidth;
  const ch = container.clientHeight;
  canvas.width = cw;
  canvas.height = ch;

  const padding = 20;

  if (state.orientation === 'portrait') {
    // 縦向き：ピッチは 68/105 アスペクト、ベンチは右側
    const PITCH_ASPECT = 68 / 105;
    const benchW = Math.max(60, Math.min(90, cw * 0.13)); // ベンチエリア幅
    const rightGap = benchW + 12;

    let ph = ch - padding * 2;
    let pw = ph * PITCH_ASPECT;
    if (pw > cw - padding - rightGap - 8) {
      pw = cw - padding - rightGap - 8;
      ph = pw / PITCH_ASPECT;
    }
    const px = padding;
    const py = (ch - ph) / 2;
    state.pitchRect = { x: px, y: py, w: pw, h: ph };

    // ベンチエリア：ピッチ右側縦列
    const bh = ph;
    const bx = px + pw + 12;
    const by = py;
    state.benchRect = { x: bx, y: by, w: benchW, h: bh };
  } else {
    // 横向き：ピッチは 105/68 アスペクト、ベンチは下側
    const PITCH_ASPECT = 105 / 68;
    const benchH = Math.max(60, Math.min(90, ch * 0.12));
    const bottomGap = benchH + 12;

    let pw = cw - padding * 2;
    let ph = pw / PITCH_ASPECT;
    if (ph > ch - padding - bottomGap - 8) {
      ph = ch - padding - bottomGap - 8;
      pw = ph * PITCH_ASPECT;
    }
    const px = (cw - pw) / 2;
    const py = padding;
    state.pitchRect = { x: px, y: py, w: pw, h: ph };

    // ベンチエリア：ピッチ直下中央
    const bw = pw;
    const bx = px;
    const by = py + ph + 12;
    state.benchRect = { x: bx, y: by, w: bw, h: benchH };
  }

  draw();
}

// ===========================
// ピッチ描画
// ===========================
function drawPitch() {
  const { x, y, w, h } = state.pitchRect;
  const isPortrait = state.orientation === 'portrait';

  // 草地グラデーション
  const grassGrad = ctx.createLinearGradient(x, y, x + w, y + h);
  grassGrad.addColorStop(0, '#2d8a3e');
  grassGrad.addColorStop(0.5, '#34a048');
  grassGrad.addColorStop(1, '#2d8a3e');
  ctx.fillStyle = grassGrad;
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, 6);
  ctx.fill();

  // ストライプ
  ctx.save();
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, 6);
  ctx.clip();
  if (isPortrait) {
    const stripeH = h / 10;
    for (let i = 0; i < 10; i++) {
      if (i % 2 === 0) {
        ctx.fillStyle = 'rgba(0,0,0,0.04)';
        ctx.fillRect(x, y + i * stripeH, w, stripeH);
      }
    }
  } else {
    const stripeW = w / 10;
    for (let i = 0; i < 10; i++) {
      if (i % 2 === 0) {
        ctx.fillStyle = 'rgba(0,0,0,0.04)';
        ctx.fillRect(x + i * stripeW, y, stripeW, h);
      }
    }
  }
  ctx.restore();

  const lw = Math.max(1.5, Math.min(w, h) / 350);
  ctx.strokeStyle = 'rgba(255,255,255,0.85)';
  ctx.lineWidth = lw;
  ctx.strokeRect(x, y, w, h);

  if (isPortrait) {
    // 縦向き：上下にゴール、水平センターライン
    // センターライン（水平）
    ctx.beginPath();
    ctx.moveTo(x, y + h / 2);
    ctx.lineTo(x + w, y + h / 2);
    ctx.stroke();

    // センターサークル
    const cr = w * 0.146;
    ctx.beginPath();
    ctx.arc(x + w / 2, y + h / 2, cr, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = 'rgba(255,255,255,0.85)';
    ctx.beginPath();
    ctx.arc(x + w / 2, y + h / 2, 3, 0, Math.PI * 2);
    ctx.fill();

    // ペナルティエリア（上下）
    const paH_p = h * (16.5 / 105);
    const paW_p = w * (40.32 / 68);
    const paX_p = x + (w - paW_p) / 2;
    ctx.strokeRect(paX_p, y, paW_p, paH_p);
    ctx.strokeRect(paX_p, y + h - paH_p, paW_p, paH_p);

    // ゴールエリア（上下）
    const gaH_p = h * (5.5 / 105);
    const gaW_p = w * (18.32 / 68);
    const gaX_p = x + (w - gaW_p) / 2;
    ctx.strokeRect(gaX_p, y, gaW_p, gaH_p);
    ctx.strokeRect(gaX_p, y + h - gaH_p, gaW_p, gaH_p);

    // ゴール（上下）
    const goalW_p = w * (7.32 / 68);
    const goalH_p = h * (2.44 / 105);
    const goalX_p = x + (w - goalW_p) / 2;
    ctx.strokeStyle = 'rgba(255,255,255,0.6)';
    ctx.strokeRect(goalX_p, y - goalH_p, goalW_p, goalH_p);
    ctx.strokeRect(goalX_p, y + h, goalW_p, goalH_p);

    // ペナルティスポット
    ctx.strokeStyle = 'rgba(255,255,255,0.85)';
    ctx.lineWidth = lw;
    ctx.fillStyle = 'rgba(255,255,255,0.85)';
    const psY_t = y + h * (11 / 105);
    const psY_b = y + h * (94 / 105);
    ctx.beginPath(); ctx.arc(x + w / 2, psY_t, 3, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(x + w / 2, psY_b, 3, 0, Math.PI * 2); ctx.fill();

    // ペナルティアーク
    const arcR_p = w * (9.15 / 68);
    ctx.beginPath();
    ctx.arc(x + w / 2, psY_t, arcR_p, Math.PI * 0.22, Math.PI * 0.78);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x + w / 2, psY_b, arcR_p, -Math.PI * 0.78, -Math.PI * 0.22);
    ctx.stroke();

    // コーナーアーク
    const cornerR_p = w * (1 / 68);
    [
      { cx: x,     cy: y,     sa: 0,             ea: Math.PI / 2 },
      { cx: x + w, cy: y,     sa: Math.PI / 2,   ea: Math.PI },
      { cx: x + w, cy: y + h, sa: Math.PI,        ea: Math.PI * 1.5 },
      { cx: x,     cy: y + h, sa: Math.PI * 1.5,  ea: Math.PI * 2 },
    ].forEach(c => {
      ctx.beginPath(); ctx.arc(c.cx, c.cy, cornerR_p, c.sa, c.ea); ctx.stroke();
    });

    // フォーメーションラベル（縦向き：自チーム=下側、相手=上側）
    ctx.save();
    const fSize = Math.round(w * 0.07);
    ctx.font = `bold ${fSize}px sans-serif`;
    ctx.fillStyle = 'rgba(255,255,255,0.45)';
    ctx.textAlign = 'center';
    const ownLabel = state.sidesFlipped ? `相手: ${state.currentOppFormation}` : `自: ${state.currentOwnFormation}`;
    const oppLabel = state.sidesFlipped ? `自: ${state.currentOwnFormation}` : `相手: ${state.currentOppFormation}`;
    ctx.textBaseline = 'bottom';
    ctx.fillText(ownLabel, x + w / 2, y + h - 4);
    ctx.textBaseline = 'top';
    ctx.fillText(oppLabel, x + w / 2, y + 4);
    ctx.restore();

  } else {
    // 横向き：左右にゴール、垂直センターライン
    ctx.beginPath();
    ctx.moveTo(x + w / 2, y);
    ctx.lineTo(x + w / 2, y + h);
    ctx.stroke();

    const cr = h * 0.146;
    ctx.beginPath();
    ctx.arc(x + w / 2, y + h / 2, cr, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = 'rgba(255,255,255,0.85)';
    ctx.beginPath();
    ctx.arc(x + w / 2, y + h / 2, 3, 0, Math.PI * 2);
    ctx.fill();

    const paW = w * (16.5 / 105);
    const paH = h * (40.32 / 68);
    const paY = y + (h - paH) / 2;
    ctx.strokeRect(x, paY, paW, paH);
    const gaW = w * (5.5 / 105);
    const gaH = h * (18.32 / 68);
    const gaY = y + (h - gaH) / 2;
    ctx.strokeRect(x, gaY, gaW, gaH);
    ctx.strokeRect(x + w - paW, paY, paW, paH);
    ctx.strokeRect(x + w - gaW, gaY, gaW, gaH);

    const goalH = h * (7.32 / 68);
    const goalW = w * (2.44 / 105);
    const goalY = y + (h - goalH) / 2;
    ctx.strokeStyle = 'rgba(255,255,255,0.6)';
    ctx.strokeRect(x - goalW, goalY, goalW, goalH);
    ctx.strokeRect(x + w, goalY, goalW, goalH);

    ctx.strokeStyle = 'rgba(255,255,255,0.85)';
    ctx.lineWidth = lw;
    ctx.fillStyle = 'rgba(255,255,255,0.85)';
    const psX_l = x + w * (11 / 105);
    ctx.beginPath(); ctx.arc(psX_l, y + h / 2, 3, 0, Math.PI * 2); ctx.fill();
    const psX_r = x + w * (94 / 105);
    ctx.beginPath(); ctx.arc(psX_r, y + h / 2, 3, 0, Math.PI * 2); ctx.fill();

    const arcR = h * (9.15 / 68);
    ctx.beginPath();
    ctx.arc(psX_l, y + h / 2, arcR, -Math.PI * 0.28, Math.PI * 0.28);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(psX_r, y + h / 2, arcR, Math.PI - Math.PI * 0.28, Math.PI + Math.PI * 0.28);
    ctx.stroke();

    const cornerR = h * (1 / 68);
    [
      { cx: x,     cy: y,     sa: 0,             ea: Math.PI / 2 },
      { cx: x + w, cy: y,     sa: Math.PI / 2,   ea: Math.PI },
      { cx: x + w, cy: y + h, sa: Math.PI,        ea: Math.PI * 1.5 },
      { cx: x,     cy: y + h, sa: Math.PI * 1.5,  ea: Math.PI * 2 },
    ].forEach(c => {
      ctx.beginPath(); ctx.arc(c.cx, c.cy, cornerR, c.sa, c.ea); ctx.stroke();
    });

    // フォーメーションラベル（横向き：自チーム=左側、相手=右側）
    ctx.save();
    ctx.font = `bold ${Math.round(h * 0.04)}px sans-serif`;
    ctx.textBaseline = 'top';
    ctx.fillStyle = 'rgba(255,255,255,0.45)';
    const ownLabelH = state.sidesFlipped ? `相手: ${state.currentOppFormation}` : `自: ${state.currentOwnFormation}`;
    const oppLabelH = state.sidesFlipped ? `自: ${state.currentOwnFormation}` : `相手: ${state.currentOppFormation}`;
    ctx.textAlign = 'left';
    ctx.fillText(ownLabelH, x + 6, y + 4);
    ctx.textAlign = 'right';
    ctx.fillText(oppLabelH, x + w - 6, y + 4);
    ctx.restore();
  }
}

// ===========================
// ベンチエリア描画
// ===========================
function getBenchSlotCenter(slotIndex) {
  const { x, y, w, h } = state.benchRect;
  const n = BENCH_SLOT_COUNT;
  if (state.orientation === 'portrait') {
    // 縦向き：縦列スロット
    const slotH = h / n;
    const cx = x + w / 2;
    const cy = y + slotH * slotIndex + slotH / 2;
    return { cx, cy };
  }
  const slotW = w / n;
  const cx = x + slotW * slotIndex + slotW / 2;
  const cy = y + h / 2;
  return { cx, cy };
}

function drawBenchArea() {
  const { x, y, w, h } = state.benchRect;
  const isPortrait = state.orientation === 'portrait';

  // 背景
  ctx.fillStyle = 'rgba(15, 25, 50, 0.75)';
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, 6);
  ctx.fill();

  ctx.strokeStyle = 'rgba(255,255,255,0.15)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, 6);
  ctx.stroke();

  // ラベル
  ctx.fillStyle = 'rgba(255,255,255,0.35)';
  if (isPortrait) {
    ctx.font = `bold ${Math.round(w * 0.18)}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText('B', x + w / 2, y + 3);
  } else {
    ctx.font = `bold ${Math.round(h * 0.18)}px sans-serif`;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText('BENCH', x + 6, y + 3);
  }

  // スロット区切り線
  const n = BENCH_SLOT_COUNT;
  ctx.strokeStyle = 'rgba(255,255,255,0.08)';
  ctx.lineWidth = 1;
  if (isPortrait) {
    const slotH = h / n;
    for (let i = 1; i < n; i++) {
      ctx.beginPath();
      ctx.moveTo(x + 4, y + slotH * i);
      ctx.lineTo(x + w - 4, y + slotH * i);
      ctx.stroke();
    }
  } else {
    const slotW = w / n;
    for (let i = 1; i < n; i++) {
      ctx.beginPath();
      ctx.moveTo(x + slotW * i, y + 4);
      ctx.lineTo(x + slotW * i, y + h - 4);
      ctx.stroke();
    }
  }
}

// ===========================
// マーカー描画
// ===========================
// rx/ry は常に「横向き基準」で保存（rx=左右0-1, ry=上下0-1）
// 縦向き表示時は rx→ry方向, ry→rx方向 に90度回転して描画する
function markerToCanvas(marker) {
  const { x, y, w, h } = state.pitchRect;
  if (state.orientation === 'portrait') {
    // 縦向き変換：横向きの rx(左右0=自ゴール) → 縦向きの上下
    // 自チーム・ボールは下側（大きいy）、相手は上側（小さいy）
    // 横向き rx: 自ゴール=0.05 → 自陣下側 cy大 → portraitY = 1 - rx
    // 横向き rx: 相手ゴール=0.95 → 相手陣上側 cy小 → portraitY = 1 - rx でOK（相手も同じ式）
    // ただし相手チームは rx が大きいほど上側なので 1-rx で上側になる → 統一式 portraitY = 1 - rx
    const portraitX = marker.ry;      // 横向きの上下 → 縦向きの左右（そのまま）
    const portraitY = 1 - marker.rx;  // 横向きの左右 → 縦向きの上下（反転：自チームGKが下へ）
    return {
      cx: x + portraitX * w,
      cy: y + portraitY * h,
    };
  }
  return {
    cx: x + marker.rx * w,
    cy: y + marker.ry * h,
  };
}

// キャンバス座標 → rx/ry（横向き基準）へ逆変換
function canvasToMarker(canvasX, canvasY) {
  const { x, y, w, h } = state.pitchRect;
  if (state.orientation === 'portrait') {
    // markerToCanvasの逆変換
    // portraitX = ry → ry = portraitX
    // portraitY = 1 - rx → rx = 1 - portraitY
    const portraitX = (canvasX - x) / w;
    const portraitY = (canvasY - y) / h;
    return {
      rx: clamp(1 - portraitY, 0, 1),
      ry: clamp(portraitX, 0, 1),
    };
  }
  return {
    rx: clamp((canvasX - x) / w, 0, 1),
    ry: clamp((canvasY - y) / h, 0, 1),
  };
}

function getMarkerRadius() {
  const { w, h } = state.pitchRect;
  // 縦向きは幅基準、横向きは幅基準
  return Math.max(14, Math.min(w, h) / 22);
}

function getBenchMarkerRadius() {
  if (state.orientation === 'portrait') {
    return Math.max(10, state.benchRect.w * 0.28);
  }
  return Math.max(12, state.benchRect.h * 0.32);
}

function drawMarker(marker) {
  if (marker.type === 'opponent' && !state.showOpponent) return;
  const { cx, cy } = markerToCanvas(marker);
  const r = getMarkerRadius();

  if (marker.type === 'ball') {
    drawBall(cx, cy, r * 0.75);
    return;
  }
  if (marker.type === 'own') {
    drawOwnMarker(marker, cx, cy, r);
  }
  if (marker.type === 'opponent') {
    drawOpponentMarker(marker, cx, cy, r);
  }
}

function drawBenchMarker(marker) {
  if (marker._onPitch) {
    // ピッチ上に移動済みの場合はmarkerToCanvasを使って縦横対応
    const r = getMarkerRadius();
    const { cx, cy } = markerToCanvas(marker);
    drawOwnMarker(marker, cx, cy, r, true);
  } else if (marker.rx !== undefined) {
    // ベンチエリア内の自由位置
    const r = getBenchMarkerRadius();
    const { x, y, w, h } = state.benchRect;
    const cx = x + marker.rx * w;
    const cy = y + marker.ry * h;
    drawOwnMarker(marker, cx, cy, r, true);
  } else {
    // 初期スロット位置
    const r = getBenchMarkerRadius();
    const { cx, cy } = getBenchSlotCenter(marker.slotIndex);
    drawOwnMarker(marker, cx, cy, r, true);
  }
}

function drawOwnMarker(marker, cx, cy, r, isBench = false) {
  const img = marker.imageDataUrl ? getImage(marker.imageDataUrl) : null;

  if (img && img.complete && img.naturalWidth > 0) {
    // 画像あり：円形クリップで画像を描画
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.clip();
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;
    const side = Math.min(iw, ih);
    const sx = (iw - side) / 2;
    const sy = (ih - side) / 2;
    ctx.drawImage(img, sx, sy, side, side, cx - r, cy - r, r * 2, r * 2);
    ctx.restore();

    // 枠線（控えはオレンジ色）
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.strokeStyle = isBench ? '#f59e0b' : '#ffffff';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // 背番号バッジ（右下）
    if (state.showNumber) {
      const br = r * 0.38;
      const bx = cx + r * 0.65;
      const by = cy + r * 0.65;
      ctx.beginPath();
      ctx.arc(bx, by, br, 0, Math.PI * 2);
      ctx.fillStyle = isBench ? '#92400e' : '#1a1a2e';
      ctx.fill();
      ctx.strokeStyle = isBench ? '#f59e0b' : '#ffffff';
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.fillStyle = '#ffffff';
      ctx.font = `bold ${Math.round(br * 1.1)}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(String(marker.number), bx, by);
    }

    // 名前
    if (state.showName && marker.name) {
      ctx.fillStyle = isBench ? '#fde68a' : '#ffffff';
      ctx.font = `bold ${Math.round(r * 0.62)}px 'Hiragino Kaku Gothic ProN','Hiragino Sans','Meiryo',sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.fillText(marker.name, cx, cy + r + 2);
    }

  } else {
    // 画像なし
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fillStyle = isBench ? '#fef3c7' : '#ffffff';
    ctx.fill();
    ctx.strokeStyle = isBench ? '#f59e0b' : '#1a1a2e';
    ctx.lineWidth = 2;
    ctx.stroke();

    if (state.showNumber) {
      ctx.fillStyle = isBench ? '#92400e' : '#1a1a2e';
      ctx.font = `bold ${Math.round(r * 0.85)}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(String(marker.number), cx, cy);
    }

    if (state.showName && marker.name) {
      ctx.fillStyle = isBench ? '#fde68a' : '#ffffff';
      ctx.font = `bold ${Math.round(r * 0.62)}px 'Hiragino Kaku Gothic ProN','Hiragino Sans','Meiryo',sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.fillText(marker.name, cx, cy + r + 2);
    }
  }
}

function drawOpponentMarker(marker, cx, cy, r) {
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(15, 80, 30, 0.88)';
  ctx.fill();
  ctx.strokeStyle = 'rgba(100, 200, 100, 0.7)';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = '#d4ffd4';
  const fontSize = marker.position.length > 3
    ? Math.round(r * 0.55)
    : Math.round(r * 0.65);
  ctx.font = `bold ${fontSize}px sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(marker.position, cx, cy);
}

function drawBall(cx, cy, r) {
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fillStyle = '#f5f5f5';
  ctx.fill();
  ctx.strokeStyle = '#333';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.fillStyle = '#222';
  const panels = [
    [0, -r * 0.42],
    [r * 0.40, -r * 0.13],
    [r * 0.25, r * 0.35],
    [-r * 0.25, r * 0.35],
    [-r * 0.40, -r * 0.13],
  ];
  ctx.beginPath();
  panels.forEach((p, i) => {
    i === 0 ? ctx.moveTo(cx + p[0], cy + p[1]) : ctx.lineTo(cx + p[0], cy + p[1]);
  });
  ctx.closePath();
  ctx.fill();

  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2 - Math.PI / 6;
    ctx.beginPath();
    ctx.arc(cx + Math.cos(angle) * r * 0.72, cy + Math.sin(angle) * r * 0.72, r * 0.18, 0, Math.PI * 2);
    ctx.fill();
  }
}

// ===========================
// メイン描画
// ===========================
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#1a1a2e';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  drawPitch();
  drawBenchArea();

  // ピッチマーカー（ボールは最後）
  const balls = [];
  state.markers.forEach(m => {
    if (m.type === 'ball') balls.push(m);
    else drawMarker(m);
  });
  balls.forEach(m => drawMarker(m));

  // ベンチマーカー
  state.bench.forEach(m => drawBenchMarker(m));
}

// ===========================
// ヒットテスト
// ===========================
function hitTestPitch(mx, my) {
  const r = getMarkerRadius();
  for (let i = state.markers.length - 1; i >= 0; i--) {
    const m = state.markers[i];
    if (m.type === 'opponent' && !state.showOpponent) continue;
    const { cx, cy } = markerToCanvas(m);
    const hitR = m.type === 'ball' ? r * 0.75 : r;
    const dx = mx - cx, dy = my - cy;
    if (dx * dx + dy * dy <= hitR * hitR) return m;
  }
  return null;
}

function hitTestBench(mx, my) {
  for (let i = state.bench.length - 1; i >= 0; i--) {
    const m = state.bench[i];
    const { cx, cy } = getBenchMarkerPos(m);
    // ピッチ上にある場合はピッチマーカーと同じ半径で判定
    const r = m._onPitch ? getMarkerRadius() : getBenchMarkerRadius();
    const dx = mx - cx, dy = my - cy;
    if (dx * dx + dy * dy <= r * r) return m;
  }
  return null;
}

// ベンチマーカーの現在位置を返す（自由移動後は rx/ry を使用）
function getBenchMarkerPos(marker) {
  if (marker.rx !== undefined && marker.ry !== undefined) {
    // ピッチ上に移動済みの場合はmarkerToCanvasで縦横対応
    if (marker._onPitch) {
      return markerToCanvas(marker);
    }
    // ベンチエリア内での自由位置
    const { x, y, w, h } = state.benchRect;
    return { cx: x + marker.rx * w, cy: y + marker.ry * h };
  }
  return getBenchSlotCenter(marker.slotIndex);
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
  return { x: (clientX - rect.left) * scaleX, y: (clientY - rect.top) * scaleY };
}

canvas.addEventListener('mousedown', onPointerDown);
canvas.addEventListener('touchstart', onPointerDown, { passive: false });

function onPointerDown(e) {
  e.preventDefault();
  const pos = getCanvasPos(e);

  // ピッチ上のマーカーを優先
  const pitchHit = hitTestPitch(pos.x, pos.y);
  if (pitchHit) {
    const { cx, cy } = markerToCanvas(pitchHit);
    state.dragging = { marker: pitchHit, area: 'pitch', offsetX: pos.x - cx, offsetY: pos.y - cy };
    canvas.style.cursor = 'grabbing';
    return;
  }

  // ベンチマーカー
  const benchHit = hitTestBench(pos.x, pos.y);
  if (benchHit) {
    const { cx, cy } = getBenchMarkerPos(benchHit);
    // 初回ドラッグ時にスロット中心から rx/ry を初期化
    if (benchHit.rx === undefined) {
      const { x, y, w, h } = state.benchRect;
      benchHit.rx = (cx - x) / w;
      benchHit.ry = (cy - y) / h;
    }
    state.dragging = { marker: benchHit, area: 'bench', offsetX: pos.x - cx, offsetY: pos.y - cy };
    canvas.style.cursor = 'grabbing';
  }
}

window.addEventListener('mousemove', onPointerMove);
window.addEventListener('touchmove', onPointerMove, { passive: false });

function onPointerMove(e) {
  if (!state.dragging) return;
  e.preventDefault();
  const pos = getCanvasPos(e);
  const m = state.dragging.marker;
  const targetX = pos.x - state.dragging.offsetX;
  const targetY = pos.y - state.dragging.offsetY;

  if (state.dragging.area === 'pitch') {
    // canvasToMarkerで縦横共通の逆変換
    const { rx, ry } = canvasToMarker(targetX, targetY);
    m.rx = rx;
    m.ry = ry;
  } else if (state.dragging.area === 'bench') {
    // ベンチマーカーはピッチ・ベンチエリア問わず全画面を自由に移動可能
    const { x: px, y: py, w: pw, h: ph } = state.pitchRect;
    const { x: bx, y: by, w: bw, h: bh } = state.benchRect;

    // ピッチエリア内にドラッグされたらピッチ座標系に切り替え
    if (targetX >= px && targetX <= px + pw && targetY >= py && targetY <= py + ph) {
      m._onPitch = true;
      const { rx, ry } = canvasToMarker(targetX, targetY);
      m.rx = rx;
      m.ry = ry;
    } else {
      // ベンチエリア（またはその外）では全キャンバス座標で管理
      m._onPitch = false;
      // ベンチエリアを基準に正規化（範囲外も許容）
      m.rx = (targetX - bx) / bw;
      m.ry = (targetY - by) / bh;
    }
  }

  draw();
}

window.addEventListener('mouseup', onPointerUp);
window.addEventListener('touchend', onPointerUp);

function onPointerUp() {
  state.dragging = null;
  canvas.style.cursor = 'default';
}

// ===========================
// 編集モーダル：プレビュー更新
// ===========================
let editTempImageDataUrl = null;

function updatePreview(dataUrl) {
  editTempImageDataUrl = dataUrl;
  imgPreviewCtx.clearRect(0, 0, 80, 80);

  if (dataUrl) {
    imgPreviewWrap.classList.add('has-image');
    const img = new Image();
    img.onload = () => {
      imgPreviewCtx.save();
      imgPreviewCtx.beginPath();
      imgPreviewCtx.arc(40, 40, 40, 0, Math.PI * 2);
      imgPreviewCtx.clip();
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      const side = Math.min(iw, ih);
      const sx = (iw - side) / 2;
      const sy = (ih - side) / 2;
      imgPreviewCtx.drawImage(img, sx, sy, side, side, 0, 0, 80, 80);
      imgPreviewCtx.restore();
    };
    img.src = dataUrl;
  } else {
    imgPreviewWrap.classList.remove('has-image');
  }
}

// ===========================
// ダブルクリックで編集モーダルを開く
// ===========================
canvas.addEventListener('dblclick', e => {
  const pos = getCanvasPos(e);

  // ピッチ上の自チームマーカー
  const pitchHit = hitTestPitch(pos.x, pos.y);
  if (pitchHit && pitchHit.type === 'own') {
    openEditModal(pitchHit);
    return;
  }

  // ベンチマーカー
  const benchHit = hitTestBench(pos.x, pos.y);
  if (benchHit) {
    openEditModal(benchHit);
  }
});

function openEditModal(marker) {
  state.editTarget = marker;
  editNumber.value = marker.number;
  editName.value = marker.name;
  updatePreview(marker.imageDataUrl || null);
  modal.classList.remove('hidden');
  editName.focus();
}

imgPreviewWrap.addEventListener('dblclick', () => editImageInput.click());

// ===========================
// 画像ファイル選択
// ===========================
editImageInput.addEventListener('change', e => {
  const file = e.target.files[0];
  if (!file) return;
  if (!file.type.startsWith('image/')) {
    showToast('画像ファイルを選択してください');
    return;
  }

  const reader = new FileReader();
  reader.onload = ev => {
    const img = new Image();
    img.onload = () => {
      const MAX = 256;
      const scale = Math.min(1, MAX / Math.max(img.width, img.height));
      const w = Math.round(img.width * scale);
      const h = Math.round(img.height * scale);
      const tmpCanvas = document.createElement('canvas');
      tmpCanvas.width = w;
      tmpCanvas.height = h;
      tmpCanvas.getContext('2d').drawImage(img, 0, 0, w, h);
      const dataUrl = tmpCanvas.toDataURL('image/jpeg', 0.85);
      updatePreview(dataUrl);
    };
    img.src = ev.target.result;
  };
  reader.readAsDataURL(file);
  editImageInput.value = '';
});

document.getElementById('edit-image-clear').addEventListener('click', () => {
  updatePreview(null);
});

// ===========================
// OK / キャンセル
// ===========================
document.getElementById('edit-ok').addEventListener('click', () => {
  if (!state.editTarget) return;
  const num = parseInt(editNumber.value, 10);
  state.editTarget.number = isNaN(num) ? state.editTarget.number : clamp(num, 1, 99);
  state.editTarget.name = editName.value.trim() || state.editTarget.name;
  state.editTarget.imageDataUrl = editTempImageDataUrl;

  if (editTempImageDataUrl) {
    imgCache.delete(editTempImageDataUrl);
    getImage(editTempImageDataUrl);
  }

  state.editTarget = null;
  editTempImageDataUrl = null;
  modal.classList.add('hidden');
  draw();
});

document.getElementById('edit-cancel').addEventListener('click', () => {
  state.editTarget = null;
  editTempImageDataUrl = null;
  modal.classList.add('hidden');
});

editName.addEventListener('keydown', e => {
  if (e.key === 'Enter') document.getElementById('edit-ok').click();
  if (e.key === 'Escape') document.getElementById('edit-cancel').click();
});
editNumber.addEventListener('keydown', e => {
  if (e.key === 'Enter') editName.focus();
});

// ===========================
// フォーメーション適用（自チーム）
// ===========================
document.getElementById('btn-apply-own').addEventListener('click', () => {
  const key = document.getElementById('formation-own').value;
  const currentOwn = state.markers.filter(m => m.type === 'own');
  const newOwn = createOwnMarkers(key, currentOwn);

  state.markers = state.markers.filter(m => m.type !== 'own');
  state.markers.unshift(...newOwn);
  state.currentOwnFormation = key;
  draw();
  showToast(`自チーム: ${key} に変更しました`);
});

// ===========================
// フォーメーション適用（相手チーム）
// ===========================
document.getElementById('btn-apply-opponent').addEventListener('click', () => {
  const key = document.getElementById('formation-opponent').value;
  const newOpp = createOppMarkers(key);

  state.markers = state.markers.filter(m => m.type !== 'opponent');
  const ballIdx = state.markers.findIndex(m => m.type === 'ball');
  if (ballIdx === -1) {
    state.markers.push(...newOpp);
  } else {
    state.markers.splice(ballIdx, 0, ...newOpp);
  }
  state.currentOppFormation = key;
  draw();
  showToast(`相手チーム: ${key} に変更しました`);
});

// ===========================
// 左右入れ替え
// ===========================
document.getElementById('btn-flip-sides').addEventListener('click', () => {
  // rx/ryは横向き基準で保存されているので、左右入れ替えは常に rx を反転
  state.markers.forEach(m => { m.rx = 1 - m.rx; });
  // ピッチ上のベンチマーカーも反転
  state.bench.forEach(m => {
    if (m._onPitch && m.rx !== undefined) m.rx = 1 - m.rx;
  });
  state.sidesFlipped = !state.sidesFlipped;
  draw();
  showToast('左右を入れ替えました');
});

// ===========================
// ピッチ向き切替
// ===========================
document.querySelectorAll('input[name="pitch-orientation"]').forEach(radio => {
  radio.addEventListener('change', e => {
    state.orientation = e.target.value;
    // 向き切替時はベンチマーカーのピッチ外位置をリセット（ベンチ内に戻す）
    state.bench.forEach(m => {
      if (!m._onPitch) {
        delete m.rx;
        delete m.ry;
      }
    });
    resizeCanvas();
    showToast(`向きを${e.target.value === 'portrait' ? '縦' : '横'}に切り替えました`);
  });
});

// ===========================
// リセット
// ===========================
document.getElementById('btn-reset').addEventListener('click', () => {
  const ownKey = document.getElementById('formation-own').value;
  const oppKey = document.getElementById('formation-opponent').value;
  state.currentOwnFormation = ownKey;
  state.currentOppFormation = oppKey;
  state.markers = buildMarkers(ownKey, oppKey, null);
  state.bench = createBenchMarkers(null);
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
const STORAGE_KEY = 'soccer_tactics_board_v4';

document.getElementById('btn-save').addEventListener('click', () => {
  const data = {
    ownFormation: state.currentOwnFormation,
    oppFormation: state.currentOppFormation,
    markers: state.markers.map(m => ({ ...m })),
    bench: state.bench.map(m => ({ ...m })),
    showOpponent: state.showOpponent,
    showName: state.showName,
    showNumber: state.showNumber,
    orientation: state.orientation,
    sidesFlipped: state.sidesFlipped,
  };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    showToast('配置を保存しました');
  } catch (e) {
    // 画像データが大きすぎる場合は画像なしで保存
    const strip = arr => arr.map(m => { const { imageDataUrl, ...rest } = m; return rest; });
    const dataNoImg = { ...data, markers: strip(data.markers), bench: strip(data.bench) };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataNoImg));
      showToast('保存しました（画像は容量超過のため除外）');
    } catch {
      showToast('保存に失敗しました（容量超過）');
    }
  }
});

document.getElementById('btn-load').addEventListener('click', () => {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) { showToast('保存データが見つかりません'); return; }
  try {
    const data = JSON.parse(raw);
    state.markers = data.markers;
    state.bench = data.bench || createBenchMarkers(null);
    state.currentOwnFormation = data.ownFormation ?? '4-2-3-1';
    state.currentOppFormation = data.oppFormation ?? '4-2-3-1';
    state.showOpponent = data.showOpponent ?? true;
    state.showName = data.showName ?? true;
    state.showNumber = data.showNumber ?? true;
    state.orientation = data.orientation ?? 'landscape';
    state.sidesFlipped = data.sidesFlipped ?? false;

    document.getElementById('formation-own').value = state.currentOwnFormation;
    document.getElementById('formation-opponent').value = state.currentOppFormation;
    document.getElementById('toggle-opponent').checked = state.showOpponent;
    document.getElementById('toggle-name').checked = state.showName;
    document.getElementById('toggle-number').checked = state.showNumber;
    document.getElementById(
      state.orientation === 'portrait' ? 'orient-portrait' : 'orient-landscape'
    ).checked = true;

    // 画像キャッシュを再構築
    [...state.markers, ...state.bench].forEach(m => {
      if (m.imageDataUrl) getImage(m.imageDataUrl);
    });

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
  const { x: px, y: py, w: pw, h: ph } = state.pitchRect;
  const { x: bx, y: by, w: bw, h: bh } = state.benchRect;
  const margin = 16;

  const outX = Math.min(px, bx) - margin;
  const outY = py - margin;
  const outW = Math.max(pw, bw) + margin * 2;
  const outH = (by + bh) - py + margin * 2;

  const tmpCanvas = document.createElement('canvas');
  tmpCanvas.width = outW;
  tmpCanvas.height = outH;
  const tmpCtx = tmpCanvas.getContext('2d');
  tmpCtx.drawImage(canvas, outX, outY, outW, outH, 0, 0, outW, outH);

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

document.addEventListener('fullscreenchange', () => setTimeout(resizeCanvas, 100));

// ===========================
// 初期化
// ===========================
window._appState = state; // デバッグ用
function init() {
  state.currentOwnFormation = '4-2-3-1';
  state.currentOppFormation = '4-2-3-1';
  state.markers = buildMarkers('4-2-3-1', '4-2-3-1', null);
  state.bench = createBenchMarkers(null);
  resizeCanvas();
}

window.addEventListener('resize', resizeCanvas);
init();
