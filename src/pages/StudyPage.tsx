import { SiteChrome } from '../components/SiteChrome';
import { useContext } from 'react';
import { CampaignLinks } from '../attribution';

export function StudyPage() {
  const { appStoreUrl } = useContext(CampaignLinks);
  return (
    <SiteChrome current="study" tone="paper">
      <main id="main" className="study-main">
        <header className="study-heading">
          <p className="eyebrow">A study guide from Airlock</p>
          <h1>Start with <br />one task.</h1>
          <p className="study-lede">Choose a small piece of work, a stop point, and a way back after a break. You can use this guide with paper and a pen.</p>
          <button className="study-print" onClick={() => window.print()}>Print this guide</button>
        </header>

        <ol className="study-steps" aria-label="Plan your next study block">
          <li>
            <h2>Name one concrete task.</h2>
            <p>Try “answer biology questions 1–4 without notes” or “outline the first two paragraphs.” If it feels too big, start with one question. Put away anything you don’t need for that task.</p>
          </li>
          <li>
            <h2>Choose a stop point and a break.</h2>
            <p>Pick a window that fits your day, such as 25 minutes. Work until the time or task ends. Then take a short break: stand up or get water. Decide when you’ll return before stepping away.</p>
          </li>
          <li>
            <h2>Leave a line to return to.</h2>
            <p>Before the break, write the next action: “Check question 2 against the lecture notes.” When you return, start there. If the plan no longer fits, make the next task smaller.</p>
          </li>
        </ol>

        <section className="study-plan" aria-labelledby="study-plan-title">
          <h2 id="study-plan-title">Your next block</h2>
          <p>Copy these four lines, or print and fill them in.</p>
          <dl>
            <div><dt>One task</dt><dd><span className="write-line" aria-hidden="true" /><span className="sr-only">Space to write your task</span></dd></div>
            <div><dt>Stop at</dt><dd><span className="write-line" aria-hidden="true" /><span className="sr-only">Space to write a time or task endpoint</span></dd></div>
            <div><dt>Return at</dt><dd><span className="write-line" aria-hidden="true" /><span className="sr-only">Space to write when you will return</span></dd></div>
            <div><dt>Next action</dt><dd><span className="write-line" aria-hidden="true" /><span className="sr-only">Space to write your first action after the break</span></dd></div>
          </dl>
        </section>

        <aside className="study-app" aria-labelledby="study-app-title">
          <p className="eyebrow">An optional tool</p>
          <h2 id="study-app-title">Want guided breathing, too?</h2>
          <p>Airlock is an iPhone app for iOS 26 or later. Guided breathing works on its own. With optional App Blocking, choose apps or websites, breathe to earn Airtime, choose an unlock duration, then tap Unlock.</p>
          <p>All features are free, with optional tips and no subscription.</p>
          <a className="primary-link" href={appStoreUrl}>Download Airlock free <span aria-hidden="true">↗</span></a>
        </aside>

        <section className="study-sources" aria-labelledby="study-sources-title">
          <h2 id="study-sources-title">More study guidance</h2>
          <p>For more on specific tasks, active study and planned breaks, explore the <a href="https://learningcenter.unc.edu/tips-and-tools/studying-101-study-smarter-not-harder/">UNC Learning Center’s study guide</a> and <a href="https://lsc.cornell.edu/managing-time/">Cornell’s time-management guide</a>. These are independent resources, not endorsements of Airlock.</p>
        </section>
      </main>
    </SiteChrome>
  );
}
