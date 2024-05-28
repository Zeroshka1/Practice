import { render, screen } from '@testing-library/react';
import CreateIssueForm from './CreateIssueForm';
import IssueList from './IssueList';
import AdminPanel from './AdminPanel';

test('renders create issue form', () => {
  render(<CreateIssueForm />);
  const createIssueForm = screen.getByTestId('create-issue-form');
  expect(createIssueForm).toBeInTheDocument();
});

test('renders issue list', () => {
  render(<IssueList issues={[]} />);
  const issueList = screen.getByTestId('issue-list');
  expect(issueList).toBeInTheDocument();
});

test('renders admin panel', () => {
  render(<AdminPanel issues={[]} />);
  const adminPanel = screen.getByTestId('admin-panel');
  expect(adminPanel).toBeInTheDocument();
});
