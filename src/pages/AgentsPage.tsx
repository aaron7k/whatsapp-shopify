import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import PageTitle from "@/components/ui/page-title";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Plus, Settings, Trash, MessageCircle, MoreHorizontal, Users } from "lucide-react";

const AgentsPage = () => {
  return (
    <DashboardLayout>
      <div className="fade-in">
        <PageTitle
          title="OpenAI Agents"
          subtitle="Create and manage AI agents for WhatsApp"
        >
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Agent
          </Button>
        </PageTitle>

        <Tabs defaultValue="agents" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="agents">My Agents</TabsTrigger>
            <TabsTrigger value="create">Create Agent</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="agents">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {agents.map((agent) => (
                <AgentCard key={agent.id} agent={agent} />
              ))}
              
              <Card className="border-2 border-dashed flex flex-col items-center justify-center h-64">
                <CardContent className="pt-6 flex flex-col items-center">
                  <div className="p-3 rounded-full bg-green-100 mb-3">
                    <Plus className="h-8 w-8 text-whatsapp" />
                  </div>
                  <h3 className="text-lg font-medium mb-1">New Agent</h3>
                  <p className="text-sm text-gray-500 text-center mb-4">
                    Create a new OpenAI agent for WhatsApp
                  </p>
                  <Button className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Agent
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="create">
            <Card>
              <CardHeader>
                <CardTitle>Create New Agent</CardTitle>
                <CardDescription>
                  Configure your OpenAI agent for WhatsApp integration
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="agentName">Agent Name</Label>
                    <Input 
                      id="agentName" 
                      placeholder="E.g., Customer Support Bot" 
                    />
                    <p className="text-xs text-gray-500">
                      Give your agent a descriptive name
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="model">AI Model</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a model" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                        <SelectItem value="gpt-4">GPT-4</SelectItem>
                        <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-gray-500">
                      More advanced models may have higher costs
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="systemPrompt">System Prompt</Label>
                    <Textarea 
                      id="systemPrompt"
                      placeholder="You are a helpful assistant for our company..."
                      className="min-h-[100px]"
                    />
                    <p className="text-xs text-gray-500">
                      This defines how your AI agent will behave
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="whatsappInstance">WhatsApp Instance</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an instance" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sales">Sales Bot</SelectItem>
                        <SelectItem value="support">Support Bot</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-3 pt-3">
                    <Label className="text-base">Advanced Options</Label>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-medium">Knowledge Base Access</h4>
                          <p className="text-xs text-gray-500">
                            Allow agent to access your product database
                          </p>
                        </div>
                        <Switch />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-medium">Human Escalation</h4>
                          <p className="text-xs text-gray-500">
                            Transfer to human agent when needed
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-medium">Conversation Memory</h4>
                          <p className="text-xs text-gray-500">
                            Remember past conversations with users
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="justify-between flex-row-reverse">
                <Button>Create Agent</Button>
                <Button variant="outline">Save as Draft</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>OpenAI Configuration</CardTitle>
                <CardDescription>
                  Manage your OpenAI API settings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="apiKey">OpenAI API Key</Label>
                    <Input 
                      id="apiKey" 
                      type="password"
                      placeholder="sk-xxxxxxxxxxxxxxxxxxxxxxxx" 
                    />
                    <p className="text-xs text-gray-500">
                      Your API key from the OpenAI dashboard
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Default Model</Label>
                    <Select defaultValue="gpt-3.5-turbo">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                        <SelectItem value="gpt-4">GPT-4</SelectItem>
                        <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-gray-500">
                      Default model for new agents
                    </p>
                  </div>
                  
                  <div className="space-y-2 pt-3">
                    <Label className="text-base">Usage Limits</Label>
                    <div className="space-y-4 pt-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-medium">Maximum Daily Tokens</h4>
                          <p className="text-xs text-gray-500">
                            Limit API usage per day
                          </p>
                        </div>
                        <Input
                          type="number"
                          className="w-24"
                          defaultValue="10000"
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-medium">Cost Alert Threshold</h4>
                          <p className="text-xs text-gray-500">
                            Send alert when costs exceed this amount ($)
                          </p>
                        </div>
                        <Input
                          type="number"
                          className="w-24"
                          defaultValue="50"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="justify-between flex-row-reverse">
                <Button>Save Settings</Button>
                <Button variant="outline">Test API Key</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

type Agent = {
  id: string;
  name: string;
  description: string;
  status: "active" | "inactive" | "draft";
  model: string;
  whatsappInstance: string;
  interactions: number;
};

const AgentCard = ({ agent }: { agent: Agent }) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{agent.name}</CardTitle>
            <CardDescription>{agent.description}</CardDescription>
          </div>
          <Badge
            className={
              agent.status === "active"
                ? "bg-green-100 text-green-800 hover:bg-green-100"
                : agent.status === "inactive"
                ? "bg-gray-100 text-gray-800 hover:bg-gray-100"
                : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
            }
          >
            {agent.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="text-sm space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-500">Model:</span>
            <span>{agent.model}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">WhatsApp:</span>
            <span>{agent.whatsappInstance}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Interactions:</span>
            <span>{agent.interactions.toLocaleString()}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="grid grid-cols-3 gap-2">
        <Button variant="outline" size="sm" className="w-full">
          <MessageCircle className="h-4 w-4 mr-1" />
          Test
        </Button>
        <Button variant="outline" size="sm" className="w-full">
          <Settings className="h-4 w-4 mr-1" />
          Edit
        </Button>
        <Button variant="outline" size="sm" className="w-full text-red-500 hover:text-red-700 hover:bg-red-50">
          <Trash className="h-4 w-4 mr-1" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

// Sample data
const agents: Agent[] = [
  {
    id: "1",
    name: "Customer Support",
    description: "Handles general inquiries and support requests",
    status: "active",
    model: "GPT-4",
    whatsappInstance: "Support Bot",
    interactions: 1245
  },
  {
    id: "2",
    name: "Product Recommendation",
    description: "Recommends products based on customer preferences",
    status: "active",
    model: "GPT-4",
    whatsappInstance: "Sales Bot",
    interactions: 856
  },
  {
    id: "3",
    name: "Order Status Assistant",
    description: "Checks and updates customers on order status",
    status: "inactive",
    model: "GPT-3.5 Turbo",
    whatsappInstance: "Notifications",
    interactions: 532
  },
  {
    id: "4",
    name: "Marketing Campaigns",
    description: "Helps with promotional campaigns",
    status: "draft",
    model: "GPT-4o",
    whatsappInstance: "Marketing",
    interactions: 0
  }
];

export default AgentsPage;
