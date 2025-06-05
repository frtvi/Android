
import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, RotateCcw, Plus, X, Home, Search } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Tab {
  id: string;
  url: string;
  title: string;
}

export const BrowserInterface = () => {
  const [tabs, setTabs] = useState<Tab[]>([
    { id: '1', url: 'https://www.google.com', title: 'Google' }
  ]);
  const [activeTabId, setActiveTabId] = useState('1');
  const [urlInput, setUrlInput] = useState('https://www.google.com');
  const [showTabs, setShowTabs] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { toast } = useToast();

  const activeTab = tabs.find(tab => tab.id === activeTabId);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  const navigateToUrl = () => {
    if (!urlInput.trim()) return;
    
    let url = urlInput.trim();
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      // Check if it's a search query or URL
      if (url.includes('.') && !url.includes(' ')) {
        url = 'https://' + url;
      } else {
        url = `https://www.google.com/search?q=${encodeURIComponent(url)}`;
      }
    }

    if (activeTab) {
      setTabs(tabs.map(tab => 
        tab.id === activeTabId 
          ? { ...tab, url, title: new URL(url).hostname }
          : tab
      ));
    }
  };

  const addNewTab = () => {
    const newTab: Tab = {
      id: Date.now().toString(),
      url: 'https://www.google.com',
      title: 'New Tab'
    };
    setTabs([...tabs, newTab]);
    setActiveTabId(newTab.id);
    setUrlInput(newTab.url);
  };

  const closeTab = (tabId: string) => {
    if (tabs.length === 1) return;
    
    const newTabs = tabs.filter(tab => tab.id !== tabId);
    setTabs(newTabs);
    
    if (activeTabId === tabId) {
      setActiveTabId(newTabs[0].id);
      setUrlInput(newTabs[0].url);
    }
  };

  const refreshPage = () => {
    if (iframeRef.current) {
      iframeRef.current.src = iframeRef.current.src;
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-2 space-y-2">
        {/* Top bar with tabs and menu */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowTabs(!showTabs)}
              className="p-2"
            >
              <Badge variant="secondary" className="text-xs">
                {tabs.length}
              </Badge>
            </Button>
            <span className="text-sm font-medium text-gray-700">Mobile Browser</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="text-red-600 hover:text-red-700"
          >
            Logout
          </Button>
        </div>

        {/* Navigation controls */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="p-2">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="p-2">
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={refreshPage} className="p-2">
            <RotateCcw className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="p-2">
            <Home className="h-4 w-4" />
          </Button>
        </div>

        {/* URL bar */}
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && navigateToUrl()}
              placeholder="Search or enter website URL"
              className="pl-10 rounded-full"
            />
          </div>
          <Button onClick={navigateToUrl} size="sm">
            Go
          </Button>
        </div>
      </div>

      {/* Tab bar */}
      {showTabs && (
        <div className="bg-white border-b border-gray-200 p-2">
          <div className="flex gap-2 overflow-x-auto">
            {tabs.map(tab => (
              <Card
                key={tab.id}
                className={`flex-shrink-0 p-2 cursor-pointer min-w-32 ${
                  tab.id === activeTabId ? 'bg-blue-50 border-blue-200' : ''
                }`}
                onClick={() => {
                  setActiveTabId(tab.id);
                  setUrlInput(tab.url);
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs truncate flex-1">{tab.title}</span>
                  {tabs.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        closeTab(tab.id);
                      }}
                      className="p-0 h-4 w-4 ml-1"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </Card>
            ))}
            <Button
              variant="ghost"
              size="sm"
              onClick={addNewTab}
              className="flex-shrink-0 p-2"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Browser content */}
      <div className="flex-1 bg-white">
        {activeTab && (
          <iframe
            ref={iframeRef}
            src={activeTab.url}
            className="w-full h-full border-0"
            title="Browser content"
            sandbox="allow-same-origin allow-scripts allow-navigation allow-forms"
          />
        )}
      </div>
    </div>
  );
};
