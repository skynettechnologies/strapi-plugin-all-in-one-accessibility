/**
 * Styles for the settings page, taken from the reference css/style.css,
 * the reference inline <style> block and the Bootstrap 5 classes it uses.
 * Everything is scoped under .aioa-plugin so nothing leaks into the Strapi admin UI.
 */
export const aioaStyles = `
.aioa-plugin { --aioa-purple:#420083; --aioa-purple-dark:#2A0057; --aioa-card:#3c007f; --aioa-green:#80c944;
  font-family:-apple-system,"Avenir Next","Segoe UI",BlinkMacSystemFont,Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif;
  color:#212529; line-height:1.5; padding:24px 16px 40px; }
.aioa-plugin *, .aioa-plugin *::before, .aioa-plugin *::after { box-sizing:border-box; }
.aioa-plugin a { color:#0d6efd; text-decoration:none; }
.aioa-plugin h3 { margin:0 0 .5rem; font-weight:700; line-height:1.2; color:#212529; }

/* Bootstrap subset */
.aioa-plugin .row { display:flex; flex-wrap:wrap; margin-left:-.75rem; margin-right:-.75rem; }
.aioa-plugin .row > * { flex-shrink:0; max-width:100%; padding-left:.75rem; padding-right:.75rem; }
.aioa-plugin .col-auto { flex:0 0 auto; width:auto; }
.aioa-plugin .col-sm-3, .aioa-plugin .col-sm-9, .aioa-plugin .col-sm-12 { flex:0 0 auto; width:100%; }
@media (min-width:576px) {
  .aioa-plugin .col-sm-3 { width:25%; } .aioa-plugin .col-sm-9 { width:75%; }
}
.aioa-plugin .col-form-label { display:block; padding-top:calc(.375rem + 1px); padding-bottom:calc(.375rem + 1px); margin-bottom:0; font-weight:bold; }
.aioa-plugin .form-control, .aioa-plugin .form-select { display:block; width:100%; padding:.375rem .75rem; font-size:1rem; line-height:1.5;
  color:#212529; background-color:#fff; border:1px solid #ced4da; border-radius:.25rem; }
.aioa-plugin .form-select { width:150px; padding-right:2.25rem; }
.aioa-plugin .form-control:focus, .aioa-plugin .form-select:focus { outline:0; border-color:rgba(66,0,131,.38); box-shadow:0 0 0 .25rem rgba(66,0,131,.2); }
.aioa-plugin .form-text, .aioa-plugin .description { margin-top:.25rem; font-size:.875em; color:#6c757d; }
.aioa-plugin .input-group { display:flex; flex-wrap:nowrap; align-items:stretch; width:auto; }
.aioa-plugin .input-group .form-control { width:120px; border-top-right-radius:0; border-bottom-right-radius:0; }
.aioa-plugin .input-group-text { display:flex; align-items:center; padding:.375rem .75rem; background:#e9ecef; border:1px solid #ced4da;
  border-left:0; border-radius:0 .25rem .25rem 0; }
.aioa-plugin .btn-primary { display:inline-block; font-weight:600; color:#fff; background:var(--aioa-purple); border:1px solid var(--aioa-purple);
  border-radius:.36rem; padding:10px 22px; cursor:pointer; }
.aioa-plugin .btn-primary:hover:not(:disabled) { background:var(--aioa-purple-dark); }
.aioa-plugin .btn-primary:disabled { opacity:.65; cursor:not-allowed; }
.aioa-plugin .btn-primary:focus-visible { outline:3px solid var(--aioa-green); outline-offset:2px; }
.aioa-plugin .visually-hidden { position:absolute !important; width:1px !important; height:1px !important; padding:0 !important; margin:-1px !important;
  overflow:hidden !important; clip:rect(0,0,0,0) !important; white-space:nowrap !important; border:0 !important; }
.aioa-plugin .mb-2 { margin-bottom:.5rem; } .aioa-plugin .mb-3 { margin-bottom:1rem; } .aioa-plugin .mt-3 { margin-top:1rem; }
.aioa-plugin .mb-30 { margin-bottom:30px !important; }
.aioa-plugin .hide { display:none !important; }

/* Reference layout */
.aioa-plugin .set-width { max-width:810px; margin:0 auto; }
.aioa-plugin .aioa-logo { display:flex; justify-content:center; padding:1.5rem 0; }
.aioa-plugin .aioa-logo img { height:70px; max-width:100%; }
.aioa-plugin .three-col { column-count:3; column-gap:3rem; }
.aioa-plugin .three-col > * { break-inside:avoid; }
@media (max-width:575px) { .aioa-plugin .three-col { column-count:2; } }
.aioa-plugin .all-one-accessibility-form { margin:0 auto 40px; border-radius:19px; background:#e9efff; padding:27px 20px 30px; }
.aioa-plugin #widget-form *:not(.form-text):not(.description) { font-size:17px; }
.aioa-plugin .aioa-section { margin-bottom:1rem; }

/* Radios (custom dot) */
.aioa-plugin .all-one-accessibility-form [type=radio] { position:absolute; left:-9999px; }
.aioa-plugin .all-one-accessibility-form [type=radio] + label { position:relative; padding-left:28px; cursor:pointer; line-height:20px; display:inline-block; color:#666; }
.aioa-plugin .all-one-accessibility-form [type=radio] + label::before { content:""; position:absolute; left:0; top:0; width:18px; height:18px;
  border:1px solid #ced4da; border-radius:100%; background:#fff; }
.aioa-plugin .all-one-accessibility-form [type=radio] + label::after { content:""; width:10px; height:10px; background:var(--aioa-purple); position:absolute;
  top:4px; left:4px; border-radius:100%; transition:all .2s ease; opacity:0; transform:scale(0); }
.aioa-plugin .all-one-accessibility-form [type=radio]:checked + label::after { opacity:1; transform:scale(1); }
.aioa-plugin .all-one-accessibility-form [type=radio]:focus-visible + label { outline:2px solid var(--aioa-purple); outline-offset:2px; }

/* Icon type / size cards
   Selectors include .all-one-accessibility-form + [type=radio] + label so they
   outrank the generic radio-label rule above (which sets inline-block). */
.aioa-plugin .all-one-accessibility-form .icon-type-wrapper [type=radio] + label.option,
.aioa-plugin .all-one-accessibility-form .icon-size-wrapper [type=radio] + label.option {
  position:relative; display:flex; align-items:center; justify-content:center;
  width:130px; height:130px; padding:10px; margin:0; line-height:0; text-align:center;
  background-color:var(--aioa-card); outline:4px solid #fff; outline-offset:-4px; border-radius:10px; cursor:pointer; }
.aioa-plugin .all-one-accessibility-form .icon-type-wrapper [type=radio] + label.option img,
.aioa-plugin .all-one-accessibility-form .icon-size-wrapper [type=radio] + label.option img {
  display:block; margin:auto; max-width:100%; max-height:100%; object-fit:contain; }
.aioa-plugin .all-one-accessibility-form .icon-type-wrapper [type=radio] + label.option::after,
.aioa-plugin .all-one-accessibility-form .icon-size-wrapper [type=radio] + label.option::after { content:none; display:none; }
.aioa-plugin .all-one-accessibility-form .icon-type-wrapper [type=radio]:not(:checked) + label.option::before,
.aioa-plugin .all-one-accessibility-form .icon-size-wrapper [type=radio]:not(:checked) + label.option::before { content:none; display:none; }
.aioa-plugin .all-one-accessibility-form .icon-type-wrapper [type=radio]:checked + label.option,
.aioa-plugin .all-one-accessibility-form .icon-size-wrapper [type=radio]:checked + label.option { outline-color:var(--aioa-green); }
.aioa-plugin .all-one-accessibility-form .icon-type-wrapper [type=radio]:checked + label.option::before,
.aioa-plugin .all-one-accessibility-form .icon-size-wrapper [type=radio]:checked + label.option::before {
  content:""; display:block; width:20px; height:20px; position:absolute; left:auto; right:-4px; top:-4px; border:0; border-radius:100%;
  background:var(--aioa-green) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath fill='none' stroke='%23fff' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round' d='M4 8.5l2.5 2.5L12 5.5'/%3E%3C/svg%3E") center/14px no-repeat; }
.aioa-plugin .all-one-accessibility-form .icon-type-wrapper [type=radio]:focus-visible + label.option,
.aioa-plugin .all-one-accessibility-form .icon-size-wrapper [type=radio]:focus-visible + label.option { outline-color:#ffbf47; }

/* Switchers */
.aioa-plugin .custom-switcher { width:100%; position:relative; display:block; cursor:pointer; margin-bottom:.5rem; }
.aioa-plugin .custom-switcher_right { display:flex; flex-direction:row-reverse; justify-content:space-between; align-items:center; gap:1rem; }
.aioa-plugin .custom-switcher_inp_2 { position:absolute; right:10px; top:0; opacity:0; width:70px; height:35px; margin:0; cursor:pointer; z-index:1; }
.aioa-plugin .custom-switcher_body { flex-shrink:0; background:#fff; border-radius:25px; width:70px; height:35px; position:relative; overflow:hidden; box-shadow:-1px 2px 6px #bbb; }
.aioa-plugin .custom-switcher_body::after { content:""; display:block; width:25px; height:25px; border-radius:100px; background:#a6a7a8; border:1px solid #a6a7a8;
  transition:transform .2s ease; top:50%; left:6px; position:absolute; transform:translateY(-50%); }
.aioa-plugin .custom-switcher_inp_2:checked + .custom-switcher_body::after { transform:translate(33px,-50%); background:var(--aioa-purple); border-color:var(--aioa-purple); }
.aioa-plugin .custom-switcher_inp_2:focus-visible + .custom-switcher_body { outline:2px solid var(--aioa-purple); outline-offset:2px; }
.aioa-plugin .custom-switcher_label { color:#000; font-weight:700; }
.aioa-plugin .custom-position-controls, .aioa-plugin .custom-size-controls { margin-top:1rem; }

.aioa-plugin .save-changes-btn { text-align:center; margin-top:1rem; }

/* Free plan upgrade banner (reference inline styles) */
.aioa-plugin #free_plan_upgrade_block { width:100%; position:relative; overflow:hidden; margin-bottom:24px;
  background:linear-gradient(135deg,var(--aioa-purple) 0%,var(--aioa-purple-dark) 100%); border-radius:16px; padding:26px 28px; color:#fff; }
.aioa-plugin .aioa-bold-watermark { position:absolute; right:-30px; top:50%; transform:translateY(-50%); width:220px; height:220px; opacity:.07; pointer-events:none; }
.aioa-plugin .aioa-bold-inner { position:relative; z-index:1; }
.aioa-plugin .aioa-bold-eyebrow { display:inline-block; font-size:11px; font-weight:700; letter-spacing:.08em; text-transform:uppercase; color:#D9C6FF;
  background:rgba(255,255,255,.12); padding:4px 10px; border-radius:999px; margin-bottom:14px; }
.aioa-plugin .aioa-bold-top { display:flex; align-items:flex-start; justify-content:space-between; gap:20px; flex-wrap:wrap; margin-bottom:6px; }
.aioa-plugin .aioa-bold-left { flex:1; min-width:240px; }
.aioa-plugin .aioa-bold-stat { font-size:34px; font-weight:800; letter-spacing:-.01em; line-height:1; margin-bottom:8px; color:#fff; }
.aioa-plugin .aioa-bold-sub { font-size:14px; color:#E4D6FF; margin:0; max-width:480px; line-height:1.5; }
.aioa-plugin .aioa-bold-sub strong { color:#fff; }
.aioa-plugin .aioa-bold-btn { flex-shrink:0; display:inline-flex; align-items:center; gap:8px; background:#fff; color:var(--aioa-purple) !important;
  font-weight:800; font-size:14.5px; padding:12px 22px; border-radius:8px; text-decoration:none; white-space:nowrap; transition:transform .15s ease, box-shadow .15s ease; }
.aioa-plugin .aioa-bold-btn:hover { transform:translateY(-1px); box-shadow:0 6px 16px rgba(0,0,0,.25); }
.aioa-plugin .aioa-bold-btn:focus-visible { outline:3px solid var(--aioa-green); outline-offset:2px; }
.aioa-plugin .aioa-bold-btn svg { width:15px; height:15px; }
.aioa-plugin .aioa-bold-trial { display:inline-block; font-size:12px; color:#E4D6FF; margin-top:4px; }
.aioa-plugin .aioa-bold-divider { height:1px; background:rgba(255,255,255,.15); margin:14px 0; }
.aioa-plugin .aioa-bold-note { color:#C9B8E8; line-height:1.5; margin:0; max-width:560px; }
.aioa-plugin .aioa-bold-note b { color:#fff; }
@media (max-width:480px) {
  .aioa-plugin .aioa-bold-top { flex-direction:column; }
  .aioa-plugin .aioa-bold-btn { width:100%; justify-content:center; }
  .aioa-plugin .aioa-bold-watermark { display:none; }
}
`;