import { render, screen } from '@testing-library/react';
import Social from './social.component';

describe('<Social />', () => {
    test('renders', () => {
        const { baseElement, debug } = render(<Social />);
        expect(baseElement).toBeVisible();
    });

    test('renders svg', () => {
        const { getByRole } = render(<Social />);
        const twitter = getByRole('twitter-test');
        const linkedin = getByRole('linkedin-test');
        const github = getByRole('github-test');
        expect(twitter).toBeInTheDocument();
        expect(linkedin).toBeInTheDocument();
        expect(github).toBeInTheDocument();
    });
    test('renders links', () => {
        const { getAllByRole } = render(<Social />);
        const links: HTMLAnchorElement[] = screen.getAllByRole('link');
        expect(links[0].href).toContain('https://no.linkedin.com/in/mindaugas-baltrunas-55462a155/no?trk=people-guest_people_search-card');
        expect(links[1].href).toContain('https://github.com/minde8888?tab=repositories');
    });
});
