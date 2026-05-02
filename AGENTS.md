## Agent skills

### Issue tracker

Issues live in the GitHub repo `sammydamz/ea-first-class-autos`. Use the `gh` CLI for all operations. See `docs/agents/issue-tracker.md`.

### Triage labels

Default triage label vocabulary (needs-triage, needs-info, ready-for-agent, ready-for-human, wontfix). See `docs/agents/triage-labels.md`.

### Workflow

Each `ready-for-agent` issue is implemented in its own branch:
- Branch name: `<issue-number>-<slug>` (e.g., `2-foundation`, `4-car-detail-page`)
- PR per issue → independent review → merge
- Keeps history clean, enables parallel work
