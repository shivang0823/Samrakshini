"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { safetyTips as initialTips, SafetyTip } from "@/lib/data";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";

export default function SafetyTipsPage() {
  const [tips, setTips] = useState<SafetyTip[]>(initialTips);
  const [newTipTitle, setNewTipTitle] = useState("");
  const [newTipContent, setNewTipContent] = useState("");

  const handleAddTip = () => {
    if (newTipTitle.trim() && newTipContent.trim()) {
      const newTip: SafetyTip = {
        id: `tip${tips.length + 1}`,
        title: newTipTitle,
        content: newTipContent,
        author: "You",
        createdAt: new Date().toISOString(),
      };
      setTips([newTip, ...tips]);
      setNewTipTitle("");
      setNewTipContent("");
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Share a Safety Tip</CardTitle>
          <CardDescription>
            Help grow our community's knowledge. What's one piece of advice you'd give?
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Tip Title (e.g., 'Stay Alert on Public Transport')"
            value={newTipTitle}
            onChange={(e) => setNewTipTitle(e.target.value)}
          />
          <Textarea
            placeholder="Describe your tip in detail..."
            value={newTipContent}
            onChange={(e) => setNewTipContent(e.target.value)}
          />
        </CardContent>
        <CardFooter>
          <Button onClick={handleAddTip}>Share Tip</Button>
        </CardFooter>
      </Card>

      <div className="space-y-4">
        <h3 className="text-2xl font-bold">Community Safety Tips</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tips.map((tip) => (
            <Card key={tip.id} className="flex flex-col">
              <CardHeader>
                <CardTitle>{tip.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground">{tip.content}</p>
              </CardContent>
              <CardFooter className="text-xs text-muted-foreground flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                        <AvatarFallback>{tip.author.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span>{tip.author}</span>
                </div>
                <span>{formatDistanceToNow(new Date(tip.createdAt), { addSuffix: true })}</span>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
