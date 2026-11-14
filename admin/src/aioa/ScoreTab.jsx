/**
 * Accessibility Score tab (reference: views/partials/accessibility-score.ejs, score/card.ejs, assets/js/score.js)
 *
 * Paid plan: loading, error (Try again), "Scanning in progress" (no results yet) or the score card.
 * Free plan: a sample card, blurred, with the upgrade card on top; nothing is requested.
 *
 * score  { view: 'idle' | 'loading' | 'error' | 'empty' | 'card', data, error }
 */
import { SCORE_LEVELS, SCORE_MAX } from './constants';
import { LockOverlay, Spinner, useInert } from './Shared';
import { formatDate, num, percent } from './utils';

const SAMPLE = {
  status: 'Compliant',
  score: 98,
  level: 'compliant',
  stats: [
    ['86.36%', '38 / 44'],
    ['0%', '0 / 0'],
    ['13', '13 / 13'],
  ],
};

const STAT_LABELS = ['Violations Remediated', 'Alt Text Remediated', 'Web Pages Scanned'];

/** Card values from the fetchScanDetails summary */
const cardValues = (summary) => {
  // Never above 99 (SCORE_MAX), also when the scan reports 100
  const score = Math.max(0, Math.min(SCORE_MAX, Math.round(Number(summary.score) || 0)));
  const violations = summary.violations || {};
  const altText = summary.alt_text || {};
  const pages = summary.pages || {};
  return {
    status: summary.status || '',
    score,
    level: SCORE_LEVELS.includes(summary.level) ? summary.level : 'not',
    stats: [
      [percent(violations.percentage), `${num(violations.fixed)} / ${num(violations.total)}`],
      [percent(altText.percentage), `${num(altText.fixed)} / ${num(altText.total)}`],
      [String(num(pages.scanned)), `${num(pages.scanned)} / ${num(pages.total)}`],
    ],
    lastScan: formatDate(summary.last_scan),
    // Only https report links are offered
    reportUrl: /^https:\/\//i.test(summary.report_url || '') ? summary.report_url : '',
  };
};

const ScoreCard = ({ values, sample }) => (
  <section
    className="aioa-card aioa-score"
    data-level={values.level}
    aria-labelledby={sample ? undefined : 'score-title'}
    id={sample ? undefined : 'score-card'}
  >
    <div className="aioa-score-head">
      <h2 id={sample ? undefined : 'score-title'}>Accessibility Score</h2>
      <p className="aioa-score-status">{values.status}</p>
    </div>

    <div className="aioa-score-body">
      {/* Score ring: --p is the score in percent */}
      <div
        className="aioa-donut"
        style={{ '--p': values.score }}
        role="img"
        aria-label={`Accessibility score ${values.score}%${values.status ? ', ' + values.status : ''}`}
      >
        <svg viewBox="0 0 120 120" aria-hidden="true">
          <circle className="aioa-donut-track" cx="60" cy="60" r="52" />
          <circle className="aioa-donut-bar" cx="60" cy="60" r="52" pathLength="100" />
        </svg>
        <span className="aioa-donut-value" aria-hidden="true">
          <b>{values.score}</b>
          <small>%</small>
        </span>
      </div>

      <div className="aioa-score-stats">
        {values.stats.map(([value, count], i) => (
          <div className="aioa-stat" key={STAT_LABELS[i]}>
            <p className="aioa-stat-value">{value}</p>
            <p className="aioa-stat-label">{STAT_LABELS[i]}</p>
            <p className="aioa-stat-count">{count}</p>
          </div>
        ))}
      </div>
    </div>

    {!sample && (
      <p className="aioa-score-foot">
        <span>{values.lastScan ? 'Last scan: ' + values.lastScan : ''}</span>
        {values.reportUrl && (
          <a href={values.reportUrl} target="_blank" rel="noopener noreferrer">
            Download PDF report<span className="visually-hidden"> (opens in a new tab)</span>
          </a>
        )}
      </p>
    )}
  </section>
);

export const ScoreTab = ({ locked, score, onRetry }) => {
  const sampleRef = useInert(locked);
  return (
    <div className={`aioa-lockable${locked ? ' is-locked' : ''}`}>
      {/* Free plan: example card behind the blur */}
      <div className="aioa-lock-content" ref={sampleRef} aria-hidden="true" hidden={!locked}>
        <ScoreCard values={SAMPLE} sample />
      </div>

      {/* Paid plan */}
      <div id="score-live" hidden={locked}>
        {(score.view === 'loading' || score.view === 'idle') && (
          <div className="aioa-loading aioa-card" role="status">
            <Spinner />
            <span>Loading your accessibility score…</span>
          </div>
        )}

        {score.view === 'error' && (
          <section className="aioa-card aioa-error-card">
            <h2>We couldn't load your accessibility score</h2>
            <p>{score.error}</p>
            <button type="button" className="aioa-btn aioa-btn-primary" onClick={onRetry}>
              Try again
            </button>
          </section>
        )}

        {score.view === 'empty' && (
          <section className="aioa-card aioa-error-card">
            <h2>Scanning in progress</h2>
            <p>
              Website scanning is in progress. It may take a few days, depending on the number of web pages and other
              factors. Once it is complete, the system will send a confirmation to your registered email.
            </p>
          </section>
        )}

        {score.view === 'card' && <ScoreCard values={cardValues(score.data)} />}
      </div>

      {locked && <LockOverlay lockId="score-lock" center />}
    </div>
  );
};
