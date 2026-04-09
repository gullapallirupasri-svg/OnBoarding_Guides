import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const GuideViewer = ({ content }) => {
  if (!content) {
    return (
      <div className="text-center py-12 text-surface-500">
        No content to display
      </div>
    );
  }

  return (
    <div className="markdown-content">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Custom renderers for better styling
          h1: ({ children }) => (
            <h1 className="text-3xl font-bold text-white mt-8 mb-4 pb-3 border-b border-surface-700/50">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-2xl font-bold text-white mt-8 mb-3 pb-2 border-b border-surface-800/50">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl font-semibold text-surface-100 mt-6 mb-2">
              {children}
            </h3>
          ),
          a: ({ children, href }) => (
            <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-primary-300 underline underline-offset-2 transition-colors">
              {children}
            </a>
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto mb-4 rounded-xl border border-surface-700/50">
              <table className="w-full">{children}</table>
            </div>
          ),
          input: ({ type, checked, ...props }) => {
            if (type === 'checkbox') {
              return (
                <input
                  type="checkbox"
                  checked={checked}
                  readOnly
                  className="mr-2 accent-primary-500 rounded"
                  {...props}
                />
              );
            }
            return <input type={type} {...props} />;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default GuideViewer;
