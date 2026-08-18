---
title: "Watermarking Without Verification: Why Claude's Text Watermark Repeats Higher Education's Plagiarism-Detection Mistake"
description: "Anthropic's SynthID-Text rollout treats disclosure as a detection problem. Higher education ran that experiment for two decades with Turnitin. A policy case for C2PA-style visible credentials over covert statistical marking."
date: 2026-08-18
draft: true
tags: ["AI Policy", "Governance"]
---

**AI POLICY & GOVERNANCE — WHITE PAPER**

**Watermarking Without Verification:** Why Claude's Text Watermark Repeats Higher Education's Plagiarism-Detection Mistake; and a case for C2PA-style visible provenance over covert statistical watermarking in AI-generated prose.

---

> *"Imitation is the sincerest [form] of flattery."*
> — Charles Caleb Colton, 1820

Colton's line has survived two centuries because it names something true about how ideas spread: to be copied is, in some sense, to be honored. Generative AI has inverted that premise twice over. First it made imitation infinite and instant — a model can echo a style, a cadence, a turn of phrase, at a scale no human plagiarist ever could, which is part of why "AI slop" has become shorthand for a kind of creative flattening. Then it made the *evidence* of that echo something only one company can see.

Watermarking does not resolve the tension between flattery and theft that Colton was writing about. It just moves the verdict behind a door only the accuser can open.

---

## Executive Summary

On August 14, 2026, Anthropic confirmed that Claude models now embed a statistical watermark — SynthID-Text, licensed from Google DeepMind's 2024 *Nature* publication — into essentially all generated text over roughly 150 words.¹ ² The mechanism biases word choice at low-stakes decision points (nudging toward "overcast" over "grey," for instance) toward a pattern only Anthropic's private key can detect. Nothing is added to the text. No character is hidden. The marking lives entirely in which words the model was nudged to prefer.

The premise behind this rollout — that covert, vendor-exclusive statistical marking constitutes meaningful disclosure — has already been tested, at population scale, for two decades. Higher education ran that exact experiment with Turnitin, starting in 1998 and intensifying sharply after its AI-detection feature launched in 2023. The record is not encouraging: false-positive rates for non-native English writers as high as 18.7% in independent testing,³ a 2007 federal lawsuit brought by four minors who argued the tool violated their copyright and presumed their guilt before any accusation was made,⁴ and — most recently — Australian Catholic University abandoning the tool outright after dismissing a substantial share of roughly 6,000 AI-misconduct allegations.⁵ Within a week of Anthropic's own disclosure, an open-source circumvention tool had passed 11,000 GitHub stars.⁶

A disclosure mechanism that only the issuer can verify is not disclosure. It is suspicion with a compliance label attached — and the two-decade record of what happens when that model runs at scale is now public, detailed, and worth reading before the next version of this mistake gets built.

This paper walks through the mechanism, the education precedent, three competing models of provenance, and a recommendation: that AI-content disclosure policy abandon covert statistical marking of prose in favor of visible, verifiable credentials — the standard Anthropic already uses for its own image and file outputs.⁷

---

## 1. The Problem

The EU Code of Practice on Transparency of AI-Generated Content, in force since August 2, 2026, obligates roughly 190 signatories — Anthropic, OpenAI, Google, Meta, and Microsoft among them — to "mark" AI-generated content.⁸ For text, the practical threshold sits around 150–200 words; below that, there are too few word-choice decisions for a statistical signal to register reliably.⁹

Anthropic's response, detailed August 14, was to deploy watermarking globally, not scoped to the EU, because the company says it lacks "a durable way to scope it by region."² The mechanism doesn't alter meaning in any single sentence the way a misused word would. It biases the *distribution* of word choices across an entire response, in a way invisible to a reader but statistically legible to whoever holds Anthropic's key.

The part worth sitting with is that Anthropic already had a transparent model for exactly this problem. C2PA content credentials — cryptographically signed, publicly readable metadata — are what the company attaches to generated images and files today. Any C2PA-aware tool can read one. Nothing is hidden, and nothing requires a secret key. Anthropic didn't choose covert marking for prose because prose is technically incapable of carrying a visible credential. It chose covert marking because a visible credential can't survive being copy-pasted, quoted, or retyped the way a statistical signal can. The question this piece is built around is whether that survivability is worth what it costs.

## 2. How It Works, and What Critics Caught

At each token-generation step, an LLM ranks candidate next-words by probability. SynthID-Text inserts a second, deterministic step on top of that ranking: candidate words are sorted into "green" and "red" buckets using a cryptographic key and the preceding text, and the model's sampling is biased, modestly, toward green. The bias is probabilistic, not absolute — a red-listed word can still be chosen, the way a weighted coin still lands on its less-favored face a meaningful share of the time.

Two things matter here. The signal is cumulative — a handful of words carries almost no statistical weight, but a few hundred allow increasingly confident detection, the same logic as inferring a biased coin from many flips rather than one.¹ And the signal is inert wherever there's only one right answer. Anthropic's own example is a sentence like "Isaac Newton's most famous work was called *Principia*" — there's no acceptable substitute for the title, so nothing can attach.

The same logic mutes the watermark in code and in heavily factual writing.

The critique from outside Anthropic converges on one point: the entire scheme is verifiable only by the party holding the key. John Gruber put it plainly at Daring Fireball — "only Anthropic will be able to determine if text was seemingly generated by Claude."¹⁰ Anthropic's own FAQ concedes the same gap: a public detection API is "coming soon," with no date attached.

James Padolsey, who built the watermark-explainer tool Declaude, raises the sharper structural objection — that the EU's own threshold treats *capability* as the trigger for suspicion, with no principled line separating a watermarked LLM from a spellchecker or a calculator, both of which also shape the words on the page without ever being asked to confess it.¹¹

OpenAI's own documentation on provenance signals leaves room for text marking to be opt-in or developer-triggered rather than blanket-applied — a materially lighter touch than Anthropic's always-on, worldwide default.¹²

Anthropic's own justification for going further than the regulation requires is operational, not philosophical, as established in Section 1 — a regional-scoping gap, not a conviction that global marking is correct policy. That's closer to "the infrastructure wasn't ready, so the whole world inherited the EU's rule by default" than to a considered position — a weak foundation for treating the current rollout as a finished answer rather than a first, correctable draft.

## 3. Higher Education Already Ran This Experiment

This is the analogy the whole piece rests on, and it deserves the full two decades, not just the recent headlines.

Turnitin was built in 1998 by four graduate researchers at UC Berkeley, originally to catch "frat file" plagiarism — physical essay banks passed down fraternity to fraternity — before the company pivoted the same matching engine toward the open internet and launched Turnitin.com in 2000.¹³ ¹⁴ By the mid-2000s it was standard infrastructure in thousands of schools, and the backlash arrived just as fast. In 2007, four minors and their families sued Turnitin's parent company, iParadigms, in federal court, arguing the tool violated their copyright by archiving their essays without consent and that mandatory submission presumed their guilt before any accusation had been made.⁴ ¹⁵ The company won — courts found the archiving fell under fair use — but the framing from that case has outlived the verdict: a tool that treats every submission as evidence to be checked against a database of past sins, rather than as writing to be read, changes the relationship between a student and their own work.¹⁶

That relationship is not abstract to me. I spent three years in higher education, and for part of that time I was the person responsible for IT operations at Clarke International University in Kampala — known as the International Health Sciences University when I first walked onto that campus — which meant I was the one who evaluated, configured, and rolled out Turnitin. I sat in the vendor demos. I read the accuracy claims the same way I'd later read Anthropic's. And I made the call to deploy a tool whose false-positive rate I had no independent way to verify, because no independent way existed — the same structural gap this paper is arguing against now, just running through a plagiarism-checker instead of a token sampler.

There's a detail worth naming here, because it's where this whole argument actually started for me. Clarke's infrastructure ran on open source almost entirely — the servers, the labs, the systems I was responsible for keeping alive. That's where I cut my teeth in the Linux user group scene, and it's the campus that eventually pointed me toward Creative Commons. So the same institution that had me deploying a closed, unverifiable, vendor-controlled detection tool was also the place that taught me the alternative to it — that provenance and integrity don't require a black box, they require a community willing to make its methods legible.

I didn't connect those two threads at the time. I'm connecting them now.

I was also, later, on the other side of that exact system. As an MBA student, my own coursework was run through Turnitin like everyone else's — and there is a particular, specific anxiety in watching a similarity score render on a paper you wrote entirely yourself, knowing the tool doesn't explain itself, only scores you, and that the number carries institutional weight regardless of whether it's right. I never had a false accusation. I had the low hum of knowing one was possible, for reasons no one — including the people who administered the tool, including me — could fully audit.

That personal experience is why the numbers that follow aren't abstract to me either. Turnitin's own accuracy claims — a 98% detection rate with a sub-1% false-positive rate on the AI-writing feature it added in 2023 — have never survived independent replication.¹⁷ Stanford's Human-Centered AI institute found detectors, including Turnitin, flagging non-native English writers at rates as high as 61% in general testing and 18.7% in Turnitin-specific follow-up work.³ ¹⁸ A peer-reviewed study found a 4.2% false-positive rate on purely human-written essays — more than four times Turnitin's own claim.¹⁹ Turnitin's own release notes conceded a "higher incidence of false positives" specifically on documents with light AI involvement — the blended, mostly-human case that is also, not coincidentally, the hardest case for Anthropic's watermark to detect reliably.²⁰ And in 2024, Australian Catholic University recorded nearly 6,000 alleged AI-misconduct cases, dismissed a substantial share after investigation, and eventually dropped the tool as ineffective — the institutional endpoint this kind of unverifiable system tends to reach once enough people have lived inside it.⁵

Twenty-eight years is long enough to stop calling this an edge case. Maybe?

## 4. What This Actually Costs the Person Using It

The instinct to attach a dollar figure to this problem — a cost-per-false-positive, a projected liability exposure — doesn't actually land, because that's not where the harm lives. Nobody's monthly Claude bill goes up because of the watermark. Nobody gets billed for a false flag. The cost is quieter than that, and it shows up as a change in behavior long before it shows up as a number on anyone's ledger.

Picture three people.

The first is an academic — someone exactly like the version of me sitting in an MBA seminar, or like a colleague publishing a peer-reviewed paper today. She uses Claude to tighten a paragraph, catch an awkward transition, suggest a stronger verb. She doesn't disclose it, not because she's hiding plagiarism but because "I asked an AI to help me phrase this sentence better" isn't a category her institution's disclosure policy has caught up to yet. Somewhere downstream, a watermark she never consented to and can't check sits embedded in her prose, verifiable only by a company she has no relationship with, waiting to be read by a detector that doesn't exist publicly yet.

She isn't guilty of anything. But the system that could clear her isn't built for her to check herself.

The second is a government office worker — the kind of person AI adoption programs are actively courting right now, in Alberta and everywhere else, told by their own institution to start using these tools to modernize public service delivery. He drafts a policy memo with Claude's help, edits it heavily in his own voice, and submits it. If his organization ever adopts a covert-watermark detector the way universities adopted Turnitin, that memo carries an invisible signal he has no way to inspect, in a job where being flagged for "undisclosed AI use" could mean a formal review he has no tools to defend himself against, for a mark he never chose to leave and can't see.

The third is the university student who has, for the first time, stopped hiding their AI use. Their program updated its academic integrity policy to explicitly *permit* disclosed AI assistance. They finally exhale. And then they read that the tool they're now allowed to use openly is quietly marking their writing anyway, whether they disclose or not, checkable only by the company that made it — which means the permission their institution just gave them sits on top of a verification layer their institution has no access to and didn't ask for.

None of these three did anything wrong.

All three now carry a small, specific unease that didn't exist before the watermark did — not the unease of being caught, but the unease of not being able to check. That is the actual cost. It's not priced in dollars because it isn't the kind of cost a spreadsheet is built to hold. It's the cost of a tool that was supposed to make AI use more honest making the honest user feel more exposed than the person actively trying to route around it — because, per Section 3 above and the circumvention tooling covered next, the person trying to route around it already has an 11,000-star head start.⁶

## 5. Three Models of Provenance

**Covert statistical watermarking (SynthID-class).** Detailed in Section 2 — a secret key biases token selection, producing a signal only the key-holder can read. Its defining property is invisibility to reader and writer alike, which is also what lets it survive copy-paste and quotation, a stated design goal since the EU rule requires robustness against "typical processing" like screenshots and translation.⁹ That same invisibility is what makes it unverifiable by anyone outside the issuing company.

**Visible cryptographic credentials (C2PA).** The standard already used by camera manufacturers, photo-editing tools, and Anthropic's own image and file outputs.⁷ A cryptographically signed, human- and machine-readable note attaches to a file's metadata. Any C2PA-aware tool can read it — not just the issuer's. Nothing about the content itself changes; the credential is additive, not a hidden bias baked into word choice. Its limitation is fragility: metadata doesn't survive copy-paste or a screenshot the way a statistical signal does, which is exactly why it hasn't been applied to prose yet.

**Voluntary declared-license attribution (Creative Commons / open source).** Neither covert nor cryptographically embedded — provenance through explicit, voluntary declaration, verifiable by any reader without special tooling or a key. Carries the weight of legalese without turning it into a brick wall.

## 6. The Model I've Spent Years Building My Own Work Around

I didn't come to this comparison abstractly. I spent years as an active voice in the Creative Commons and open-source software communities, advocating for copyleft and attribution-based licensing at a time when the dominant industry instinct — much like the industry instinct behind SynthID-Text today — was to lock provenance behind proprietary, vendor-controlled mechanisms. CC and copyleft licensing argued the opposite: that provenance works best when it's declared openly, in a form anyone can read and verify without asking permission from the party that created the work.

That's not a hypothetical design. It's the license this very piece is published under. CC BY-SA 4.0 states, in plain and public language, that this work is mine, that it can be shared and adapted, and under what terms — verifiable by any reader, any court, any future dispute, without a single API call to me. It has no secret key. It doesn't need one. Its authority rests on a social and legal norm that dishonest attribution carries real consequences, not on a technical mechanism that makes dishonesty statistically detectable only to its author.

The comparison to watermarking is direct. SynthID-Text is trying to solve an attribution problem — did this text come from Claude — using the opposite design philosophy from the one the CC and open-source communities spent two decades proving actually works at scale: covert instead of open, vendor-verified instead of publicly verifiable, involuntary instead of declared. The model that already has a working, multi-decade track record is the one nobody building AI disclosure policy right now seems to be looking at.

The comparison that matters isn't which model is strongest in isolation — it's which one fails safely.

Covert watermarking's failure mode, per Sections 3 and 4, is false suspicion landing on someone who did nothing wrong. Voluntary attribution's failure mode is under-disclosure by someone who was never going to disclose honestly regardless of what mechanism existed — which is the status quo already, watermark or not. C2PA's failure mode is fragility: a credential that doesn't survive a screenshot resolves to "unknown," not "accused."

Unknown is a far safer place to land than accused.

## 7. What Should Happen Instead

Disclosure of AI involvement in content is a legitimate goal. Nothing here argues otherwise — my own publishing practice, licensing every long-form piece under CC BY-SA 4.0 with my name attached, is itself a voluntary disclosure norm I chose because I believe in it. The argument is narrower: the specific mechanism chosen for prose inherits the exact failure mode higher education already demonstrated at scale over two decades, and it does so while remaining, per Section 4's GitHub evidence, trivially circumvented by the motivated actor it's nominally built to catch.

Three things follow.

**First**, disclosure regimes for AI-generated prose should require visible, independently verifiable provenance — the C2PA model Anthropic already runs for images and files — instead of a covert, vendor-exclusive statistical signal. This isn't a request for an unproven mechanism. It's a request that the company extend a disclosure philosophy it already trusts enough to use elsewhere.

**Second**, until that migration happens, signatories should publish a working, independently auditable detector now, not "soon." Every claim currently circulating about the watermark's strength or weakness — in either direction — is unfalsifiable without one. That's the exact epistemic condition that let the worst parts of the Turnitin record fester for years: an accuracy claim only the vendor could verify is much easier to overstate, and much easier to quietly walk back, than one any outside researcher can test.

**Third**, institutions — universities, government offices, anyone adopting this the way higher ed adopted Turnitin — should treat covert watermark detection exactly the way they should have always treated an unverified Turnitin score: a signal to corroborate, never a sole basis for accusing someone of misrepresenting their work.

None of this asks Anthropic to abandon disclosure as a goal.

It asks for a mechanism whose failure mode is "unknown" rather than "false accusation" — the same choice the Creative Commons and open-source communities made, correctly, when they built attribution on voluntary, verifiable declaration instead of covert enforcement. That model has a two-decade track record of working. It's worth building on, instead of relearning Turnitin's lesson a second time at the infrastructure layer.

## Conclusion

Higher education is not a cautionary tale from the AI era. It's a twenty-eight-year record, starting in 1998, running through a 2007 federal lawsuit over consent and presumed guilt, and arriving, by 2024, at a university abandoning the tool outright after independent testing found false-positive rates several times higher than the vendor ever claimed. I sat on both sides of that system — the administrator who deployed it, the student who was scored by it — and neither seat gave me a way to audit the number. That is the same structural gap Claude's watermark now runs on, just moved from a plagiarism-checker to a token sampler.

The cost of that gap was never going to show up as a dollar figure. It shows up as the academic who quietly stops disclosing, the government worker who second-guesses a memo he wrote in his own voice, the student who finally felt permission to use AI openly and now isn't sure the permission means anything if the marking happens regardless. None of them did anything wrong. All of them are carrying a system's unresolved verification problem as a personal one.

There was already a working answer sitting next to the broken one. Visible, verifiable credentials — C2PA-class — fail safely: no signal reads as unknown, not as accused, and Anthropic already trusts this model enough to run it for images and files. Voluntary, declared attribution — the standard Creative Commons and the open-source community spent two decades proving out, the standard this piece is published under — solves the same disclosure problem transparently, without a secret key, and without anyone needing the vendor's permission to check it. Disclosure and attribution were never the same problem. The second one is already solved. It's worth building the first one on the same foundation, instead of relearning Turnitin's lesson a second time at the infrastructure layer.

Lay the pieces next to each other and the shape is hard to miss. Anthropic had a legal obligation to disclose AI involvement in text, and chose a mechanism — SynthID-Text — that only its own key can verify, deployed worldwide not out of conviction but because regional scoping wasn't ready in time. The critics who caught this fastest weren't wrong about the mechanics: green-listed words, a secret key, and no public detector to check any of it against, which is precisely why every claim about the watermark's strength has been unfalsifiable by anyone outside the company since the day it shipped.

Colton's line opened this piece for a reason: imitation being the sincerest form of flattery only holds if flattery is something we're allowed to see happening. Watermarking doesn't stop the imitation generative AI makes possible, and it doesn't resolve the anxiety around creative flattening that "AI slop" has come to name. It just makes the evidence of the imitation visible to exactly one party — the company that built the model — while the rest of us, academic, government worker, student, write on top of a signal we can't check and can't opt out of.

---

**A Note on How This Was Made**

Claude helped write this piece — pulling research, drafting first passes of nearly every section, arguing with me when my framing got sloppy. I directed it, disputed it, rewrote the parts that didn't sound like me, and cut the parts that did but shouldn't have. Every claim in here was checked against a source. Every anecdote is mine, not the model's. I stand behind every conclusion as one I'd defend to someone who disagrees with it.

Given that I work in AI adoption and advocacy for a living, declining to use the tools I advocate for would be its own small hypocrisy — so here's my disclosure, made the way I've just spent several thousand words arguing disclosure should actually work: openly, voluntarily, in my own name, with no secret key required. It's also why this piece carries a CC BY-SA license rather than anything tighter. If I'm going to insist that provenance should be declared rather than covertly enforced, the least I can do is declare mine and let anyone build on it freely.

---

**About the Author**

Brian A. Ssennoga is an AI Policy & Governance Practitioner and ML Project Manager at the Alberta Machine Intelligence Institute (Amii), one of Canada's three national AI institutes. He is a founding member of the ICT Association of Uganda and holds MBA, PMP, and CGEIT designations, with over two decades of technology experience across multiple continents, three years of experience in higher education, and a longstanding history as an advocate within the Creative Commons and open-source software communities. His writing on AI governance, African technology policy, and responsible AI publishes at [brianssennoga.ca](https://brianssennoga.ca). The views expressed in this paper are his own and do not represent Amii.

This work is licensed under CC BY-SA 4.0 with attribution to Brian A. Ssennoga.

---

## References

<small>

1. Dathathri S, See A, Ghaisas S, et al. Scalable watermarking for identifying large language model outputs. *Nature*. 2024;634:818-823. doi:10.1038/s41586-024-08025-4
2. Anthropic. How Claude's text watermark works. August 14, 2026. https://www.anthropic.com/news/claude-text-watermark
3. Myers A. AI-Detectors Biased Against Non-Native English Writers. Stanford Human-Centered Artificial Intelligence. May 15, 2023.
4. Students v. iParadigms LLC (McLean lawsuit). Filed E.D. Va., March 2007. Reporting: Education Week, "Online Anti-Plagiarism Service Sets Off Court Fight," 2007; CSMonitor, "Students sue antiplagiarism website for rights to their homework," April 10, 2007.
5. ABC News (Australia). Reporting on Australian Catholic University academic misconduct cases, 2024. Cited in: Popular AI, "These Turnitin false positives in 2025 and 2026 show why AI detectors can't be proof." https://www.popularai.org/p/these-turnitin-false-positives-in
6. KuCoin. Claude Watermark Removal Tool Gains 11K Stars on GitHub. August 2026. https://www.kucoin.com/news/flash/claude-watermark-removal-tool-gains-11k-stars-on-github
7. Anthropic. How Claude's text watermark works — "What about images and other files?" section. (See ref. 2.)
8. European Commission. Code of Practice on Transparency of AI-Generated Content. https://digital-strategy.ec.europa.eu/en/policies/code-practice-ai-generated-content
9. Thompson B. Anthropic's Watermarking: How It Probably Works. Stratechery. August 2026. [Accessed secondhand via Gruber, ref. 10 — verify directly against a Stratechery subscription before republication.]
10. Gruber J. Anthropic's "Watermark" Text Adulteration in Claude Is a Perversion of Writing. Daring Fireball. August 16, 2026. https://daringfireball.net/2026/08/anthropics_watermark_text_adulteration_in_claude_is_a_perversion_of_writing
11. Padolsey J. Anthropic's Weak Watermarks Appease a Weak Law. blog.j11y.io. August 12, 2026. https://blog.j11y.io/2026-08-12_Anthropics-weak-watermarks-appease-a-weak-law/
12. OpenAI. Provenance Signals (Content Credentials, SynthID) in OpenAI-Generated Content. https://help.openai.com/en/articles/8912793-provenance-signals-content-credentials-synthid-in-openai-generated-content
13. Turnitin (company history). Founded 1998 by John Barrie, Christian Storm, Emmanuel Briand, and Melissa Lipscomb at UC Berkeley as iParadigms LLC; Plagiarism.org launched 1999; Turnitin.com launched 2000. Wikipedia, "Turnitin"; Grokipedia, "Turnitin."
14. Turnitin. 5 historical moments that shaped the concept of plagiarism. Turnitin blog. https://www.turnitin.com/blog/5-historical-moments-that-shaped-plagiarism
15. InformationWeek. Students Sue Turnitin Anti-Plagiarism Service For Copyright Infringement. 2007. https://www.informationweek.com/it-sectors/students-sue-turnitin-anti-plagiarism-service-for-copyright-infringement
16. Conference on College Composition and Communication. McLean Students File Suit Against Turnitin.com: Useful Tool or Instrument of Tyranny? https://cccc.ncte.org/cccc/committees/ip/2007developments/mclean/
17. Leap AI. Turnitin AI Detection Accuracy 2026: Scores, False Positives. https://www.tryleap.ai/turnitin/accuracy
18. Stanford follow-up study (2025), Turnitin-specific non-native English false-positive rate of 18.7%. Cited in: AI Busted, "Turnitin AI Checker Review." (See ref. 19.)
19. [Independent replication] Computers and Education, 2024 study of Turnitin against 500 human-written and 500 AI-generated essays; 91% correct AI-flag rate, 4.2% false-positive rate on human text. Cited in: AI Busted, "Turnitin AI Checker Review: How Accurate Is It Really? (2026)." [Secondary source — verify against original journal DOI before republication.] https://blog.aibusted.com/turnitin-ai-checker-review/
20. K-12 Dive. Turnitin admits there are some cases of higher false positives in AI writing detection tool. 2023. https://www.k12dive.com/news/turnitin-false-positives-AI-detector/652221/
21. GitHub. guillaumemeyer/watermarks-remover. https://github.com/guillaumemeyer/watermarks-remover
22. Cybernews. Entrepreneur fights Claude text watermarks by creating a remover. https://cybernews.com/ai-news/claude-watermark-removal/
23. BleepingComputer. AI 'watermark removers' flood the web. Almost none can prove they work. https://www.bleepingcomputer.com/news/security/ai-watermark-removers-flood-the-web-almost-none-can-prove-they-work/
24. Jisc National Centre for AI. AI Detection and assessment — an update for 2025. https://nationalcentreforai.jiscinvolve.org/wp/2025/06/24/ai-detection-assessment-2025/
25. University of San Diego Legal Research Center. The Problems with AI Detectors: False Positives and False Negatives. https://lawlibguides.sandiego.edu/c.php?g=1443311&p=10721367

</small>
